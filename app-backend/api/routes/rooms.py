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
    
@router.get("/room-layouts", response_model=list[RoomLayout])
def get_room_layouts(session: SessionDep, limit: int = 100):
    try:
        positions = fetch_room_layouts(session, limit)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving room layouts: {e}")
    
@router.get("/room-layouts/{roomId}", response_model=RoomLayout)
def get_room_layout_by_roomId(roomId: int, session: SessionDep):
    try:
        roomLayout= fetch_room_layouts_by_id(roomId, session)
        return roomLayout
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving room layout: {e}")
    
@router.get("/{buildingId}", response_model=list[RoomPublic])
def get_rooms_by_buildingId(buildingId: int, session: SessionDep):
    try:
        return fetch_rooms_by_building(buildingId, session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retreiving rooms by building Id: {e}")