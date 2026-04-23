from sqlmodel import SQLModel, Field
from datetime import datetime

class Closures(SQLModel, table=True):
    __tablename__ = "Closures"

    closureId: int = Field(default=None, primary_key=True)
    buildingId: int = Field(index=True, foreign_key="Buildings.buildingId")
    openTime: datetime
    closeTime: datetime
