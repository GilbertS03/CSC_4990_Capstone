from sqlmodel import SQLModel, Field

class DeviceStatus(SQLModel, table=True):
    __tablename__="DeviceStatuses"

    deviceStatusId: int = Field(default=None, primary_key=True)
    deviceStatus: str = Field(index=True)