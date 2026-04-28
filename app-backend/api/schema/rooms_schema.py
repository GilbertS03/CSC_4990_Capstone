from typing import Optional

from pydantic import BaseModel, ConfigDict

class RoomBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    roomName: str

class RoomPublic(RoomBase):
    buildingId: Optional[int] = None
    roomId:int
    
class RoomLayout(RoomBase):
    layoutHeight: int
    layoutWidth: int
    roomId: int

class CreateRoom(BaseModel):
    roomName: str
    buildingId: int
    layoutWidth: int
    layoutHeight: int