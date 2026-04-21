from fastapi import APIRouter, HTTPException, Depends, status

from ..auth.services.auth_service import require_roles, get_current_active_user
from ..db.session import SessionDep
from ..schema.user_schema import UserPublic
from ..services.reservations import *
from ..services.users import fetch_user_role
from ..emailSystem.emailsystem import *

router = APIRouter (
    prefix="/reservations",
    tags=["reservations"],
    responses={404: {"Description": "Not Found"}}
)

STATUS_DROPPED_NUM = 2
STATUS_CANCELLED = "Cancelled"

@router.get("/all", response_model=list[UserReservation])
def get_reservations(session: SessionDep):
    return fetch_all_reservations(session)

    
@router.get("/status/", response_model=list[UserReservation])
def get_reservation_statuses(
    session: SessionDep, 
    resStatus: str,
    userId: int | None = None
):
    return fetch_reservation_statuses(session, userId, resStatus)


#TODO: add logic to ensure reservation stays within building hours
@router.post("/create")
def create_new_reservation(reservation: CreateReservation, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    if has_existing_res(session, user.userId, reservation.startTime.date()) and (user.role == "student"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User {user.userId} has an existing reservation for this day: {reservation.startTime.date()}")
    if has_conflict(session, reservation):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Reservation Conflict")
    new_res = create_reservation(session, reservation, user)
    if new_res is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User does not have enough hours remaining")
    send_email("Reservation Creation", f"Reservation Creation Successful, {user.firstName}!\nDevice: {reservation.deviceId}.\nStart Time: {reservation.startTime:%B %d, %Y - %I:%M %p}\nEnd Time: {reservation.endTime:%B %d, %Y - %I:%M %p}", user.email)
    return new_res



@router.put("/drop_reservation/{resId}")
def drop_active_res(resId: int, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    res = fetch_reservation_by_id(session, resId)
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Reservation not found")
    if res.status == STATUS_CANCELLED:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Reservation already dropped")
    if((res.userId != user.userId) and (user.role == "student")):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"User not authorized to drop this reservation")
    drop_confirmed = drop_reservation(session, resId, user)
    if drop_confirmed.reservationStatusId != STATUS_DROPPED_NUM:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error cancelling reservation {resId}")
    email_dropped_reservation(user.userId, resId, "Unexpected Error Occurred in this Building", session)
    return drop_confirmed


@router.delete("/delete/{resId}")
def delete_active_reservation(resId: int, session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    res = fetch_reservation_by_id(session, resId)
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Reservation not found")
    del_confirmed = delete_reservation(session, resId)
    if not del_confirmed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting reservation: {res.reservationId}")
    return res

    