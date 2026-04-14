from pydantic import BaseModel, ConfigDict
from datetime import time

class BuildingBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    buildingName: str

class BuildingPublic(BuildingBase):
    buildingId: int

class BuildingTime(BuildingPublic):
    openTime: time
    closeTime: time

class BuildingCreate(BaseModel):
    buildingId: int
    buildingName: str
    openTime: time
    closeTime: time