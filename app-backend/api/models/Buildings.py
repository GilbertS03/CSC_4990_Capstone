from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Time
from datetime import time

class Buildings(SQLModel, table=True):
    __tablename__ = "Buildings"

    buildingId: int = Field(default=None, primary_key=True)
    openTime: time = Field(sa_column=Column(Time))
    closeTime: time = Field(sa_column=Column(Time))
    buildingName: str 