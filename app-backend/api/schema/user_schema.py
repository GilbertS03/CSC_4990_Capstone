from pydantic import BaseModel, ConfigDict, field_validator

from ..models.Roles import Roles


class UserBase(BaseModel):    
    model_config = ConfigDict(from_attributes=True)

    email: str
    firstName: str
    lastName: str

class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    weeklyHoursRemaining: float
    role: str
    
    @field_validator("role", mode="before")
    def extract_role(cls, v):
        if isinstance(v, Roles):
            return v.role
        return v

