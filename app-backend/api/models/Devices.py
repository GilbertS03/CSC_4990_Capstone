from sqlmodel import SQLModel, Field

class Devices(SQLModel, table=True):
    __tablename__="Devices"

    deviceId: int = Field(default=None, primary_key=True)
    buildingId: int = Field(index=True, foreign_key="Buildings.buildingId")
    type: str 
    status: str = Field(index=True)
    positionX: int 
    positionY: int