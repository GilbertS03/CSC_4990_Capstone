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
    return fetch_rooms(session)

    
@router.get("/room-layouts", response_model=list[RoomLayout])
def get_room_layouts(session: SessionDep, limit: int = 100):
    positions = fetch_room_layouts(session, limit)
    return positions

    
@router.get("/room-layouts/{roomId}", response_model=RoomLayout)
def get_room_layout_by_roomId(roomId: int, session: SessionDep):
    roomLayout= fetch_room_layouts_by_id(roomId, session)
    return roomLayout

    
@router.get("/{buildingId}", response_model=list[RoomPublic])
def get_rooms_by_buildingId(buildingId: int, session: SessionDep):
    return fetch_rooms_by_building(buildingId, session)

    
@router.get("/{roomId}/available-device-count", response_model=int)
def get_available_device_count_by_roomId(roomId: int, session: SessionDep):
    return fetch_available_devices_by_room(roomId, session)
