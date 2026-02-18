from sqlmodel import SQLModel, Field

class Buildings(SQLModel, table=True):
    __tablename__ = "Buildings"

    buildingId: int = Field(default=None, primary_key=True)
    openTime: str
    closeTime: str
    buildingName: str 
    layoutHeight: int
    layoutWidth: int