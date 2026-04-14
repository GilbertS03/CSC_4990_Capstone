from fastapi import APIRouter, HTTPException, status, Depends

from ..auth.services.auth_service import require_roles
from ..db.session import SessionDep
from..services.rooms import *
from ..services.users import UserPublic

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

    
@router.post("/new_room", response_model=RoomPublic, status_code=status.HTTP_201_CREATED)
def create_new_room(session: SessionDep, newRoom: CreateRoom, user: UserPublic = Depends(require_roles("admin"))):
    room = create_room(session, newRoom)
    return room

@router.delete("/delete-room/{roomId}", response_model=RoomPublic)
def delete_a_room(session: SessionDep, roomId: int, user: UserPublic = Depends(require_roles("admin"))):
    room = fetch_room_by_id(session, roomId)
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room to delete not found: {roomId}")
    del_confirmed = delete_room(session, roomId)
    if not del_confirmed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting room {roomId}")
    return room

@router.get("/{roomId}/available-device-count", response_model=int)
def get_available_device_count_by_roomId(roomId: int, session: SessionDep):
    return fetch_available_devices_by_room(roomId, session)

@router.get("/{buildingId}", response_model=list[RoomPublic])
def get_rooms_by_buildingId(buildingId: int, session: SessionDep):
    return fetch_rooms_by_building(buildingId, session)
