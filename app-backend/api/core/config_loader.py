from .config import Settings, DevSettings, ProdSettings
from functools import lru_cache
import os

@lru_cache
def get_settings() -> Settings:
    if os.getenv("ENV") == "production":
        return ProdSettings.from_secrets()
    return DevSettings()

settings = get_settings()
