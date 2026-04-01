from pydantic import BaseModel, ConfigDict
from datetime import timedelta

class BuildingBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    buildingName: str

class BuildingPublic(BuildingBase):
    buildingId: int

class BuildingTime(BuildingBase):
    openTime: timedelta
    closeTime: timedelta