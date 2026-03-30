import boto3
import json
from pydantic_settings import BaseSettings
from pydantic import computed_field
from sqlalchemy.engine import URL

def get_secrets():
    client = boto3.client('secretsmanager', region_name='us-east-1')
    secret = client.get_secret_value(SecretId='myapp/backend')
    return json.loads(secret['SecretString'])

class Settings(BaseSettings):
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
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME
        )

secrets = get_secrets()
settings = Settings(**secrets)