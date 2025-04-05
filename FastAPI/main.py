from fastapi import FastAPI, Depends, status
from pydantic import BaseModel
from typing import Annotated, List
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from userService import UserService

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    username: str
    email: str
    phone: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    phone: str
    
    class Config:
        from_attributes = True 

def get_db():
    db = SessionLocal()
    try :
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
    user_service = UserService(db)
    return user_service.create_user(user.username, user.email, user.phone, user.password)

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: db_dependency):
    user_service = UserService(db)
    return user_service.get_user(user_id)

@app.get("/users/", response_model=List[UserResponse])
async def get_all_users(db:db_dependency):
    user_service = UserService(db)
    return user_service.get_all_users()

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user:UserBase, db:db_dependency):
    user_service = UserService(db)
    return user_service.update_user(user_id, user.username, user.email, user.phone)

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT) 
async def delete_user(user_id: int, db:db_dependency):
    user_service = UserService(db)
    user_service.delete_user(user_id)
    return {"message": "User deleted successfully"}
