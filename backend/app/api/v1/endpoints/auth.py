from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Literal

from app.api.v1.database import SessionLocal
from app.api.v1.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic Schemas ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Literal['CUSTOMER', 'OFFICER'] = "CUSTOMER"

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Endpoints ---
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    new_user = auth_service.register_user(
        db=db,
        name=user_in.name,
        email=user_in.email,
        password=user_in.password,
        role=user_in.role
    )
    return {"msg": "User registered successfully", "user_id": new_user.user_id}

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    access_token = auth_service.authenticate_user(
        db=db,
        email=user_in.email,
        password=user_in.password
    )
    return {"access_token": access_token, "token_type": "bearer"}