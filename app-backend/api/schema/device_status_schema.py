from pydantic import BaseModel, ConfigDict

class DeviceStatuses(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    deviceStatusId: int
    deviceStatus: str
