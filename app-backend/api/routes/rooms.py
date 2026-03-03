from fastapi import APIRouter, HTTPException

from ..db.session import SessionDep
from..services.rooms import *

router = APIRouter(
    prefix="/rooms",
    tags=["rooms"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/", response_model=list[RoomPublic])
def get_rooms(session: SessionDep):
    try:
        return fetch_rooms(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving rooms: {e}")