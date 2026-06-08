from fastapi import APIRouter

from app.api.v1.endpoints import health, scoring, auth

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(scoring.router, prefix="/scoring", tags=["scoring"])
api_router.include_router(auth.router)
