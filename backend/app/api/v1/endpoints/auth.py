from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Literal

from app.api.v1.database import get_async_db
from app.api.v1.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])

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
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_async_db)):
    new_user = await auth_service.register_user(
        db=db,
        name=user_in.name,
        email=user_in.email,
        password=user_in.password,
        role=user_in.role
    )
    return {"msg": "User registered successfully", "user_id": new_user.user_id}

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_async_db)):
    access_token = await auth_service.authenticate_user(
        db=db,
        email=user_in.email,
        password=user_in.password
    )
    return {"access_token": access_token, "token_type": "bearer"}