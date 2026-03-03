from sqlmodel import SQLModel, Field

class Room(SQLModel, table=True):
    __tablename__="Rooms"

    roomId: int = Field(default=None, primary_key=True)
    buildingId: int = Field(index=True, foreign_key="Buildings.buildingId")
    layoutHeight: int
    layoutWidth: int
    roomName: str