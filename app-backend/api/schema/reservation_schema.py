from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_validator
from ..models.ReservationStatuses import ReservationStatuses

class ReservationBase(BaseModel):
    model_config=ConfigDict(from_attributes=True)

    reservationId: int 
    startTime: datetime
    endTime: datetime

class UserReservation(ReservationBase):
    userId: int
    deviceId: int
    status: str

    @field_validator("status",mode="before")
    def extract_status(cls, v):
        if isinstance(v, ReservationStatuses):
            return v.reservationStatus
        return v


# TODO: finish addind schema classes, start Api routes.