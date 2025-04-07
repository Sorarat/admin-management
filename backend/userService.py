from sqlalchemy.orm import Session
from models import User
from fastapi import HTTPException, status
import bcrypt

class UserService:
    def __init__(self, db:Session):
        self.db = db
    
    def create_user(self, username: str, email: str, phone: str, password: str):

        # check if the user already exists
        existing_user = self.db.query(User).filter(User.email == email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        #Create a new user and hash the password"""
        db_user = User(username=username, email=email, phone=phone)
        db_user.set_password(password) # hashing the password
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user) # ensure that the new user is fully loaded
        return db_user
    
    def get_user(self, user_id: int):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    
    def get_all_users(self):
        return self.db.query(User).all()
    
    def update_user(self, user_id: int, username: str, email: str, phone: str):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        user.username = username
        user.email = email
        user.phone = phone
        self.db.commit()
        self.db.refresh(user)
        return user
    

    def delete_user(self, user_id: int):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        self.db.delete(user)
        self.db.commit()
        return {"message": "User deleted successfully"}
    
    def authenticate_user(self, username:str, password:str):
        user = self.db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return None
        return user