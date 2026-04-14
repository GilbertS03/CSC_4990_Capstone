from pydantic import BaseModel, ConfigDict, field_validator

from ..models.DeviceStatus import DeviceStatus
from ..models.DeviceType import DeviceType

class DeviceBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    deviceId: int
    roomId: int

class DevicePublic(DeviceBase):
    deviceType: str
    deviceStatus: str 

    @field_validator("deviceType", mode="before")
    def extract_device_type(cls, v):
        if isinstance(v, DeviceType):
            return v.deviceType
        return v
    
    @field_validator("deviceStatus", mode="before")
    def extract_device_status(cls, v):
        if isinstance(v, DeviceStatus):
            return v.deviceStatus
        return v
    
class DevicePosition(DevicePublic):
    positionX: int
    positionY: int

class CreateDevice(BaseModel):
    deviceTypeId: int

class EditDevice(BaseModel):
    deviceId: int
    deviceTypeId: int
    deviceStatusId: int
