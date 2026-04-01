from sqlmodel import SQLModel, Field
from datetime import timedelta

class Buildings(SQLModel, table=True):
    __tablename__ = "Buildings"

    buildingId: int = Field(default=None, primary_key=True)
    openTime: timedelta
    closeTime: timedelta
    buildingName: str 