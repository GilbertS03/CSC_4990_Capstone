from sqlmodel import SQLModel, Field
import time

class Closures(SQLModel, table=True):
    __tablename__ = "Closures"

    closureId: int = Field(default=None, primary_key=True)
    buidlingId: int = Field(index=True, foreign_key="Buildings.buildingId")
    openTime: time
    closeTime: time
    date: str