from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base

from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL
if not DATABASE_URL.startswith("postgresql+asyncpg://"):
    raise RuntimeError("DATABASE_URL must use asyncpg scheme: postgresql+asyncpg://...")

async_engine = create_async_engine(DATABASE_URL)

AsyncSessionLocal = async_sessionmaker(bind=async_engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_db():
    async with AsyncSessionLocal() as session:
        yield session

Base = declarative_base()