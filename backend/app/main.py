from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError

from app.core.config import settings
from app.core.database import Base, engine
from app.core.exceptions import integrity_error_handler
from app.api.v1.router import api_router


# Create all tables on startup
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    #docs_url=f"{settings.API_V1_PREFIX}/docs",
)

app.add_exception_handler(IntegrityError, integrity_error_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/health")
def health_check():
    return {"status": "ok", "version": settings.VERSION}
