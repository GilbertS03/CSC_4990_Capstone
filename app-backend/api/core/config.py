from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from sqlalchemy.engine import URL
from pydantic import computed_field
import json
import boto3

def get_secrets(secret_name: str) -> dict:
    client = boto3.client("secretsmanager", region_name="us-east-1")
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])

class Settings(BaseSettings):

    JWT_SECRET_KEY: str

    ENV: str
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_DEV_HOST: str
    DB_PORT: str    
    DB_NAME: str

    DEFAULT_ROLE: int
    DEFAULT_WEEKLY_HOURS: int

  
    LIBRARY_EMAIL: str
    LIBRARY_EMAIL_PASSWORD: str
    GMAIL_TEST_EMAIL: str
    GMAIL_TEST_PASSWORD: str


    @computed_field
    @property
    def DATABASE_URI(self) -> URL:
        return URL.create(
            drivername="mysql+pymysql",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME
    )

class DevSettings(Settings):
    model_config = SettingsConfigDict(
        env_file = Path(__file__).parent.parent.parent / ".env",
        env_file_encoding = "utf-8",
        extra = "ignore",
        env_ignore_empty = True
    )

class ProdSettings(Settings):
    model_config = SettingsConfigDict(
        extra="ignore",
        env_ignore_empty=True
    )
    @classmethod
    def from_secrets(cls) -> "ProdSettings":
        secrets = get_secrets("myapp/backend") 
        return cls(**secrets)
