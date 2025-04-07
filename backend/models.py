from sqlalchemy import Boolean, Column, Integer, String
from database import Base
from security import hash_password

class User(Base):
    __tablename__ = 'user'  

    id = Column(Integer, primary_key=True, index=True) 
    username = Column(String(50))
    email = Column(String(255), unique=True)
    phone = Column(String(20))
    password = Column(String(255))

    def set_password(self, password: str):
        self.password = hash_password(password)