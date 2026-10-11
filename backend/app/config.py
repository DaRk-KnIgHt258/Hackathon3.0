from pathlib import Path
from pydantic_settings import BaseSettings
from functools import lru_cache

# Resolve .env relative to this file so it works from any working directory
_ENV_FILE = Path(__file__).parent.parent / ".env"


class Settings(BaseSettings):
    gemini_api_key: str = ""
    database_url: str = "sqlite:///./nyayasutra.db"
    host: str = "0.0.0.0"
    port: int = 8000

    model_config = {"env_file": str(_ENV_FILE), "extra": "ignore"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()
