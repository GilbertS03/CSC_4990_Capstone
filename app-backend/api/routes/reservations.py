from fastapi import APIRouter, HTTPException, Depends

from ..auth.services.auth_service import require_roles
from ..db.session import SessionDep
from ..services.reservations import *

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