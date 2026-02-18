from pydantic import BaseModel

class DevicePosition(BaseModel):
    deviceId: int
    positionX: float
    positionY: float