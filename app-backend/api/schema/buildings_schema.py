from pydantic import BaseModel, ConfigDict, field_validator

class BuildingBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    buildingId: int

class BuildingPublic(BuildingBase):
    buildingName: str

class BuildingTime(BuildingBase):
    openTime: str
    closeTime: str