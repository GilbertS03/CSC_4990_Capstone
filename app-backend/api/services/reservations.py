from datetime import datetime, date
from sqlmodel import select, cast, Session, Date, func

from ..services.users import subtract_user_hours, add_user_hours
from ..services.rooms import Rooms
from ..services.users import fetch_users_by_id
from ..models.Reservations import Reservations
from ..models.Devices import Devices
from ..models.ReservationStatuses import ReservationStatuses
from ..schema.user_schema import UserPublic
from ..schema.reservation_schema import UserReservation, CreateReservation

STATUS_PENDING = 3

def fetch_all_reservations(session: Session):
    statement = select(Reservations)
    reservations = session.exec(statement).all()
    return [UserReservation.model_validate(res) for res in reservations]

def fetch_reservation_by_id(session: Session, resId: int):
    statement = select(Reservations).where(Reservations.reservationId == resId)
    reservation = session.exec(statement).first()
    return UserReservation.model_validate(reservation) if reservation else None

def fetch_reservation_by_day(session: Session, deviceId: int, date: date):
    statement = select(Reservations).where(
        Reservations.deviceId == deviceId,
        func.date(Reservations.startTime) == date
    )
    reservations = session.exec(statement).all()
    
    return [UserReservation.model_validate(res) for res in reservations]

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
        cast(Reservations.startTime, Date) == newResDate,
        Reservations.reservationStatusId == STATUS_PENDING
    )
    res = session.exec(statement).one_or_none()
    return res

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

def all_res_exist(session: Session, reservations: list[int]):
    for resId in reservations:
        statement = select(Reservations).where(Reservations.reservationId == resId)
        if session.exec(statement).one_or_none() is None:
            return {"status": False, "resId": resId}
    return {"status": True, "resId": 0}
        
def drop_reservations(session: Session, resList: list[int]):
    dropped_list = []
    for resId in resList:
        res = session.get(Reservations, resId)
        user = fetch_users_by_id(res.userId, session)
        dropped_list.append(drop_reservation(session, resId, user).reservationId)
    return dropped_list

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

def fetch_reservations_by_building(session: Session, bId: int, resStart: datetime, resEnd: datetime):
    subqRoom = select(Rooms.roomId).where(Rooms.buildingId == bId)
    subqDev = select(Devices.deviceId).where(Devices.roomId.in_(subqRoom))
    
    statement = select(Reservations.reservationId).where(
        Reservations.deviceId.in_(subqDev),
        Reservations.startTime < resEnd,
        Reservations.endTime > resStart
    )

    reservations = session.exec(statement).all()
    return reservations

def fetch_reservations_by_user_id(session: Session, userId: int):
    statement = select(Reservations).where(userId == Reservations.userId)
    reservations = session.exec(statement).all()
    return reservations