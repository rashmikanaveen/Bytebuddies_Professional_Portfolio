from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    PROJECT_NAME: str = "Green Scoring System - CBC"
    VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api/v1"

    DB_HOST: str | None = None
    DB_PORT: str | None = None
    DB_NAME: str | None = None
    DB_USER: str | None = None
    DB_PASSWORD: str | None = None
    DB_SSLMODE: str | None = None

    # Database
    DATABASE_URL: str | None = None

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]

    def __init__(self, **values):
        super().__init__(**values)
        if not self.DATABASE_URL:
            if all([self.DB_HOST, self.DB_USER, self.DB_PASSWORD, self.DB_NAME]):
                port = self.DB_PORT or "5432"
                ssl_param = "?ssl=require" if self.DB_SSLMODE == "require" else ""
                self.DATABASE_URL = f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{port}/{self.DB_NAME}{ssl_param}"
            else:
                raise ValueError(
                    "DATABASE_URL must be set directly or composed from DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME"
                )


settings = Settings()
