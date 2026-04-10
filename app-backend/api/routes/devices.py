from fastapi import APIRouter, HTTPException, Depends, status

from ..auth.services.auth_service import require_roles
from ..schema.devices_schema import DevicePosition, DevicePublic
from ..schema.user_schema import UserPublic
from ..db.session import SessionDep
from ..services.devices import *
from ..services.rooms import fetch_room_by_id

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
    
@router.get("/status", response_model=list[DevicePublic])
def get_device_statuses_by_room_and_roomId(session: SessionDep, devStatus: str, roomId: int | None = None):
    try:
        if roomId is not None:
            roomExists = fetch_room_by_id(session, roomId) is not None
            if not roomExists:
                raise HTTPException(status_code=status.HTTP_200_OK, detail=f"Room does not exist")
        devices = fetch_devices_status_by_room(session, devStatus, roomId)
        return devices
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

@router.post("/create")
def create_new_device(device: CreateDevice, session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    try:
        newDevice = create_device(session, device)
        return newDevice
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
    
@router.get("/device-positions", response_model=list[DevicePosition])
def get_device_positions(session: SessionDep, limit: int = 100):
    try:
        positions = fetch_device_positions(session, limit)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving device positions: {e}")
    
@router.put("/device-positions/edit/{dId}", response_model=DevicePosition)
def edit_device_by_id(session: SessionDep, dId: int, newXPos: int, newYPos: int, user: UserPublic = Depends(require_roles("admin"))):
    try:
        updatedDevicePos = edit_device_position(session, dId, newXPos, newYPos)
        return updatedDevicePos
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
    
@router.get("/device-positions/{rid}", response_model=list[DevicePosition])
def get_devices_by_room_id(session: SessionDep, rid:int):
    try:
        positions = fetch_device_positions_room_id(session, rid)
        return positions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving device positions: {e}")
        
@router.delete("/delete/{dId}", response_model=DevicePublic)
def delete_device_by_id(session: SessionDep, dId: int, user: UserPublic = Depends(require_roles("admin"))):
    try:
        device = fetch_device_by_id(session, dId)
        if not device:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Device to delete not found: {dId}")
        del_confirmed = delete_device(session, dId)
        if not del_confirmed:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting device {dId}")
        return device
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")