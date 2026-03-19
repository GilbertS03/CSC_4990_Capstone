from pydantic import BaseModel, ConfigDict

class RoomBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    roomName: str

class RoomPublic(RoomBase):
    buildingId: int
    roomId:int
    
class RoomLayout(RoomBase):
    layoutHeight: int
    layoutWidth: int