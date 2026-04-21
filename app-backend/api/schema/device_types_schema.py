from pydantic import BaseModel, ConfigDict

class DeviceTypes(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    deviceTypeId: int
    deviceType: str
