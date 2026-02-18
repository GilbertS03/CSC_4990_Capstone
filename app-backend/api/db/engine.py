import os
from urllib.parse import quote_plus
from dotenv import load_dotenv
from sqlalchemy.engine import URL
from sqlmodel import create_engine

load_dotenv()

user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
databaseName = os.getenv("DB_NAME")

DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=user,
    password=password,
    host=host,
    port=port,
    database=databaseName
)
# DATABASE_URL=f"mysql+pymysql://{user}:{password}@{host}:{port}/{databaseName}"
print(DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL, echo=True)
    with engine.connect() as connection:
        print("Successfully connected to the database.")
except Exception as e:
    print(f"Error connecting to the database: {e}")

def get_engine():
    return engine