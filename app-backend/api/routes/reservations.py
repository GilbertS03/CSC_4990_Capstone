from fastapi import APIRouter, HTTPException, Depends

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

@router.get("/all", response_model=list[UserReservation])
def get_reservations(session: SessionDep):
    try:
        return fetch_all_reservations(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"error retrieving reservation: {e}")
    
@router.get("/status/", response_model=list[UserReservation])
def get_reservation_statuses(
    session: SessionDep, 
    userId: int | None = None,
    deviceId: int | None = None,
    status: str | None = None
):
    try:
        return fetch_reservation_statuses(session, userId, deviceId, status)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving reservations: {e}")

@router.post("/create")
async def create_new_reservation(reservation: CreateReservation, session: SessionDep, user: UserPublic = Depends(get_current_active_user),):
    user_role = fetch_user_role(session, user.email)
    if has_conflict(session, reservation):
        raise HTTPException(status_code=400, detail=f"Reservation Conflict")
    return "successfully created"
    # return create_reservation(session, reservation, user)