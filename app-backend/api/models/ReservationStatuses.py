from sqlmodel import SQLModel, Field

class ReservationStatuses(SQLModel, table=True):
    __tablename__="ReservationStatuses"

    reservationStatusId: int = Field(default=None, primary_key=True)
    reservationStatus: str = Field(index=True)