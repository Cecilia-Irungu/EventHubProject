from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    database_url: str = "sqlite:///./eventhive.db"
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Override database_url with DATABASE_URL if it exists (for Render)
        if os.getenv("DATABASE_URL"):
            self.database_url = os.getenv("DATABASE_URL")

settings = Settings()
