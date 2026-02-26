from sqlmodel import SQLModel, Field

class Devices(SQLModel, table=True):
    __tablename__="Devices"

    deviceId: int = Field(default=None, primary_key=True)
    roomId: int = Field(index=True, foreign_key="Rooms.roomId")
    deviceTypeId: int = Field(index=True, foreign_key="DeviceTypes.deviceTypeId")
    deviceStatusId: int = Field(index=True, foreign_key="DeviceStatuses.deviceStatusId")
    positionX: int 
    positionY: int