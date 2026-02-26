from sqlmodel import SQLModel, Field

class Devices(SQLModel, table=True):
    __tablename__="Devices"

    deviceId: int = Field(default=None, primary_key=True)
    roomId: int = Field(index=True, foreign_key="Rooms.roomId")
    deviceTypeId: str 
    deviceStatusId: str = Field(index=True, foreign_key="DeviceTypes.deviceTypeId")
    positionX: int 
    positionY: int