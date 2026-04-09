from fastapi import APIRouter, HTTPException, Depends, status

from ..auth.services.auth_service import require_roles, get_current_active_user
from ..db.session import SessionDep
from ..schema.user_schema import UserPublic
from ..services.reservations import *
from ..services.users import fetch_user_role

router = APIRouter (
    prefix="/reservations",
    tags=["reservations"],
    responses={404: {"Description": "Not Found"}}
)

STATUS_DROPPED_NUM = 2
STATUS_CANCELLED = "Cancelled"

@router.get("/all", response_model=list[UserReservation])
def get_reservations(session: SessionDep):
    try:
        return fetch_all_reservations(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"error retrieving reservation: {e}")
    
@router.get("/status/", response_model=list[UserReservation])
def get_reservation_statuses(
    session: SessionDep, 
    resStatus: str,
    userId: int | None = None
):
    try:
        return fetch_reservation_statuses(session, userId, resStatus)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error retrieving reservations: {e}")

#TODO: add logic to ensure reservation stays within building hours
@router.post("/create")
async def create_new_reservation(reservation: CreateReservation, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    try:
        if has_existing_res(session, user.userId, reservation.startTime.date()) and (user.role == "student"):
            raise HTTPException(status_code=status.HTTP_200_OK, detail=f"User {user.userId} has an existing reservation for this day: {reservation.startTime.date()}")
        if has_conflict(session, reservation):
            raise HTTPException(status_code=status.HTTP_200_OK, detail=f"Reservation Conflict")
        new_res = create_reservation(session, reservation, user)
        if new_res is None:
            raise HTTPException(status_code=status.HTTP_200_OK, detail=f"User does not have enough hours remaining")
        return new_res
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

@router.put("/drop_reservation/{resId}")
async def drop_active_res(resId: int, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    try:
        res = fetch_reservation_by_id(session, resId)
        if not res:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Reservation not found")
        if res.status == STATUS_CANCELLED:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Reservation already dropped")
        if((res.userId != user.userId) and (user.role == "student")):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"User not authorized to drop this reservation")
        drop_confirmed = drop_reservation(session, resId, user)
        if drop_confirmed.reservationStatusId != STATUS_DROPPED_NUM:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error cancelling reservation {resId}")
        return drop_confirmed
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

@router.delete("/delete/{resId}")
async def delete_active_reservation(resId: int, session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    try:
        res = fetch_reservation_by_id(session, resId)
        if not res:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Reservation not found")
        del_confirmed = delete_reservation(session, resId)
        if not del_confirmed:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting reservation: {res.reservationId}")
        return res
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
    