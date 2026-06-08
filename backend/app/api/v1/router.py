from fastapi import APIRouter

from app.api.v1.endpoints import health, scoring, auth, questions,responses,application    

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(scoring.router, prefix="/scoring", tags=["scoring"])
api_router.include_router(auth.router)
api_router.include_router(questions.router)
api_router.include_router(responses.router)
api_router.include_router(application.router)
