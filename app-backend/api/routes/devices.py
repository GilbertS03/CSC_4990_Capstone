from fastapi import APIRouter, HTTPException, Depends

from ..auth.services.auth_service import require_roles
from ..schema.devices_schema import DevicePosition, DevicePublic
from ..schema.user_schema import UserPublic
from ..db.session import SessionDep
from ..services.devices import *

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[DevicePublic])
def get_devices(session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    try:
        devices = fetch_all_devices(session)
        return devices
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving devices: {e}")


@router.get("/device-positions", response_model=list[DevicePosition])
def get_device_positions(session: SessionDep, limit: int = 100):
    try:
        positions = fetch_device_positions(session, limit)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving device positions: {e}")
    
@router.get("/device-positions/{rid}", response_model=list[DevicePosition])
def get_devices_by_room_id(session: SessionDep, rid:int):
    try:
        positions = fetch_device_positions_room_id(session, rid)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving device positions: {e}")