from datetime import datetime, date
from sqlmodel import select, cast, Session, Date

from ..services.users import subtract_user_hours, add_user_hours
from ..models.Reservations import Reservations
from ..models.ReservationStatuses import ReservationStatuses
from ..schema.user_schema import UserPublic
from ..schema.reservation_schema import UserReservation, CreateReservation


def fetch_all_reservations(session: Session):
    statement = select(Reservations)
    reservations = session.exec(statement).all()
    return [UserReservation.model_validate(res) for res in reservations]

def fetch_reservation_by_id(session: Session, resId: int):
    statement = select(Reservations).where(Reservations.reservationId == resId)
    reservation = session.exec(statement).first()
    return UserReservation.model_validate(reservation) if reservation else None

def convert_res_to_db_model(session: Session, resId: int):
    db_data = session.get(Reservations, resId)
    return db_data

def fetch_reservation_statuses(
    session: Session,
    status: str,
    userId: int | None = None
    ):
    statement = (
        select(Reservations)
        .join(ReservationStatuses, Reservations.reservationStatusId == ReservationStatuses.reservationStatusId)
        .where(ReservationStatuses.reservationStatus == status)
    )
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
    
    currHours = user.weeklyHoursRemaining
    hourDiff = calc_hour_diff(new_res.startTime, new_res.endTime)

    if hourDiff > currHours:
        return None
    
    updatedHours = subtract_user_hours(session, user.userId, hourDiff)
    
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

def has_existing_res(session: Session, userId: int, newResDate: date):
    statement = select(Reservations).where(
        Reservations.userId == userId,
        cast(Reservations.startTime, Date) == newResDate
    )
    res = session.exec(statement).first()
    return res is not None

def delete_reservation(session: Session, resId: int):
    res = convert_res_to_db_model(session, resId)
    session.delete(res)
    session.commit()

    deleted = session.get(Reservations, resId)
    return deleted is None

def calc_hour_diff(resStart: datetime, resEnd: datetime):
    resLength = resEnd - resStart
    diffInHrs = (resLength.total_seconds() / 3600)
    return diffInHrs

def drop_reservation(session: Session, resId: int, user: UserPublic):
    statement = select(Reservations).where(Reservations.reservationId == resId)
    res = session.exec(statement).one()

    currHours = user.weeklyHoursRemaining
    hourDiff = calc_hour_diff(res.startTime, res.endTime)
    updatedHours = add_user_hours(session, user.userId, hourDiff)

    if currHours >= updatedHours:
        return None

    res.reservationStatusId = 2
    session.add(res)
    session.commit()

    dropped = session.get(Reservations, resId)
    return dropped