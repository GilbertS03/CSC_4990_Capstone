from pydantic import BaseModel, ConfigDict

class BuildingBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    buildingName: str

class BuildingPublic(BuildingBase):
    buildingId: int

class BuildingTime(BuildingBase):
    openTime: str
    closeTime: str