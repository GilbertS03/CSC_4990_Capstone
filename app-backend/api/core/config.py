from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from sqlalchemy.engine import URL
from pydantic import computed_field

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file = Path(__file__).parent.parent.parent / ".env",
        env_file_encoding = "utf-8",
        extra = "ignore",
        env_ignore_empty = True
    )

    JWT_SECRET_KEY: str

    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_DEV_HOST: str
    DB_PORT: str    
    DB_NAME: str

    DEFAULT_ROLE: int
    DEFAULT_WEEKLY_HOURS: int

    @computed_field
    @property
    def DATABASE_URI(self) -> URL:
        return URL.create(
            drivername="mysql+pymysql",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_DEV_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME
    )