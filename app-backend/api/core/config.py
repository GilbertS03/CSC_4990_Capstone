import boto3
import json
from pydantic_settings import BaseSettings
from pydantic import computed_field
from sqlalchemy.engine import URL

def get_secrets():
    client = boto3.client('secretsmanager', region_name='us-east-1')
    secret = client.get_secret_value(SecretId='myapp/backend')
    return json.loads(secret['SecretString'])

secrets = get_secrets()

class Settings(BaseSettings):
    JWT_SECRET_KEY: str = secrets.get('JWT_SECRET_KEY')
    DB_USER: str = secrets.get('DB_USER')
    DB_PASSWORD: str = secrets.get('DB_PASSWORD')
    DB_HOST: str = secrets.get('DB_HOST')
    DB_DEV_HOST: str = secrets.get('DB_DEV_HOST')
    DB_PORT: str = secrets.get('DB_PORT')
    DB_NAME: str = secrets.get('DB_NAME')
    DEFAULT_ROLE: int = secrets.get('DEFAULT_ROLE')
    DEFAULT_WEEKLY_HOURS: int = secrets.get('DEFAULT_WEEKLY_HOURS')

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

settings = Settings()