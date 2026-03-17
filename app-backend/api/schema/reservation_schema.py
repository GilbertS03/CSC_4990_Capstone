from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_validator
from ..models.ReservationStatuses import ReservationStatuses

class ReservationBase(BaseModel):
    model_config=ConfigDict(from_attributes=True)

    deviceId: int
    startTime: datetime
    endTime: datetime

class UserReservation(ReservationBase):
    reservationId: int 
    status: str
    userId: int

    @field_validator("status",mode="before")
    def extract_status(cls, v):
        if isinstance(v, ReservationStatuses):
            return v.reservationStatus
        return v

class CreateReservation(ReservationBase):
    pass

