from fastapi import FastAPI, Depends, status, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Annotated, List, Optional
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from userService import UserService
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os
from chat_manager import ConnectionManager
import json

# load environment variables
load_dotenv()

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

manager = ConnectionManager()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
models.Base.metadata.create_all(bind=engine)


# User creation schema (password required)
class UserCreate(BaseModel):
    username: str
    email: str
    phone: str
    password: str  

# User update schema (password optional)
class UserBase(BaseModel):
    username: str
    email: str
    phone: str
    password: Optional[str] = Field(None, title="Password", description="Password is optional for update.")

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    phone: str
    
    class Config:
        from_attributes = True 

class Token(BaseModel):
    access_token: str
    token_type: str

def get_db():
    db = SessionLocal()
    try :
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# JWT algorithm
SECRET_KEY = os.getenv("SECRET_KEY")  
ALGORITHM = os.getenv("ALGORITHM", "HS256") 
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc)  + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_service = UserService(db)
    user = user_service.authenticate_user(username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: db_dependency):
    user_service = UserService(db)
    return user_service.create_user(user.username, user.email, user.phone, user.password)

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: db_dependency, payload: dict = Depends(verify_token)):
    user_service = UserService(db)
    return user_service.get_user(user_id)

@app.get("/users/", response_model=List[UserResponse])
async def get_all_users(db:db_dependency, payload: dict = Depends(verify_token)):
    user_service = UserService(db)
    return user_service.get_all_users()

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user:UserBase, db:db_dependency, payload: dict = Depends(verify_token)):
    user_service = UserService(db)
    return user_service.update_user(user_id, user.username, user.email, user.phone)

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT) 
async def delete_user(user_id: int, db:db_dependency, payload: dict = Depends(verify_token)):
    user_service = UserService(db)
    user_service.delete_user(user_id)
    return {"message": "User deleted successfully"}


@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: db_dependency):
    user_service = UserService(db)
    user = user_service.get_user(user_id)
    
    if not user:
        await websocket.send_text("User not found.")
        return
    
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()
            
            try:
                message_data = json.loads(data)
                msg = message_data.get("message")
                sender = message_data.get("sender")
            except (json.JSONDecodeError, AttributeError):
                await websocket.send_text("Invalid message format.")
                continue

            if msg and sender:
                await manager.send_personal_message(f"You wrote: {msg}", websocket)
                await manager.broadcast(f"{sender} says: {msg}")
            else:
                await websocket.send_text("Missing message or sender.")

    except Exception as e:
        manager.disconnect(user_id)
        await manager.broadcast(f"{sender} has left the chat")

