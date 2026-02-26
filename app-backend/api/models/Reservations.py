from sqlmodel import SQLModel, Field
from datetime import datetime

class Reservations(SQLModel, table=True):
    __tablename__="Reservations"

    reservationId: int = Field(default=None, primary_key=True)
    userId: int = Field(index=True, foreign_key="Users.userId")
    deviceId: int = Field(index=True, foreign_key="Devices.deviceId")
    reservationStatusId: int = Field(index=True, foreign_key="ReservationStatuses.reservationStatusId")
    startTime: datetime
    endTime: datetime