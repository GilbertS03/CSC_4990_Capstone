from ..core.config_loader import settings
from sqlmodel import create_engine


DATABASE_URL = settings.DATABASE_URI

try:
    engine = create_engine(DATABASE_URL, echo=True)
    with engine.connect() as connection:
        print("Successfully connected to the database.")
except Exception as e:
    print(f"Error connecting to the database: {e}")

def get_engine():
    return engine