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

STATUS_DROPPED = 2

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
        return fetch_reservation_statuses(session, resStatus, userId)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error retrieving reservations: {e}")

@router.post("/create")
async def create_new_reservation(reservation: CreateReservation, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    if has_conflict(session, reservation):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Reservation Conflict")
    return create_reservation(session, reservation, user)

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
    
@router.post("/drop_reservation/{resid}")
async def drop_active_res(resId: int, session: SessionDep, user: UserPublic = Depends(get_current_active_user)):
    try:
        res = fetch_reservation_by_id(session, resId)
        if not res:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Reservation not found")
        drop_confirmed = drop_reservation(session, resId)
        if drop_confirmed.reservationStatusId != STATUS_DROPPED:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error cancelling reservation {resId}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
    
    return 