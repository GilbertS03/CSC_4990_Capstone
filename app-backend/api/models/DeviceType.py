from sqlmodel import SQLModel, Field

class DeviceType(SQLModel, table=True):
    __tablename__="DeviceTypes"

    deviceTypeId: int = Field(default=None, primary_key=True)
    deviceType: str = Field(index=True)