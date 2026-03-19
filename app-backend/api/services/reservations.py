import datetime
from sqlmodel import select, Session
from sqlalchemy import cast, Date
from ..models.Reservations import Reservations
from ..models.ReservationStatuses import ReservationStatuses
from ..schema.user_schema import UserPublic
from ..schema.reservation_schema import UserReservation, CreateReservation


def fetch_all_reservations(session: Session):
    statement = select(Reservations)
    reservations = session.exec(statement).all()
    return [UserReservation.model_validate(res) for res in reservations]

def fetch_reservation_statuses(
    session: Session, 
    userId: int | None = None,
    deviceId: int | None = None,
    status: str | None = None
):
    statement = select(Reservations)
    if status:
        statement = statement.join(ReservationStatuses).where(ReservationStatuses.reservationStatus == status)
    if userId:
        statement = statement.where(Reservations.userId == userId)
    reservations = session.exec(statement).all()
    return [UserReservation.model_validate(res) for res in reservations]

def create_reservation(session: Session, reservation: CreateReservation, user: UserPublic):
    new_res = Reservations.model_validate(reservation, update={
        "userId": user.userId,
        "startTime": reservation.startTime.replace(second=0, microsecond=0),
        "endTime": reservation.endTime.replace(second=0, microsecond=0),
        "reservationStatusId": 3
    })
    
    session.add(new_res)
    session.commit()
    session.refresh(new_res)

    return new_res

def has_conflict(session: Session, reservation: UserReservation):
    new_res_start = reservation.startTime.replace(second=0, microsecond=0)
    new_res_end = reservation.endTime.replace(second=0, microsecond=0)

    statement = select(Reservations).where(
        Reservations.deviceId == reservation.deviceId,
        Reservations.startTime < new_res_end,
        Reservations.endTime > new_res_start
    )
    overlap = session.exec(statement).first()
    return overlap is not None
