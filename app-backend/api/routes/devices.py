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
    devices = fetch_all_devices(session)
    return devices

    
@router.get("/status", response_model=list[DevicePublic])
def get_device_statuses_by_room_and_roomId(session: SessionDep, devStatus: str, roomId: int | None = None):
    if roomId is not None:
        roomExists = fetch_room_by_id(session, roomId) is not None
        if not roomExists:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room does not exist")
    devices = fetch_devices_status_by_room(session, devStatus, roomId)
    return devices


@router.post("/create", response_model=DevicePublic, status_code=status.HTTP_201_CREATED)
def create_new_device(device: CreateDevice, session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    newDevice = create_device(session, device)
    return newDevice


@router.get("/device-positions", response_model=list[DevicePosition])
def get_device_positions(session: SessionDep, limit: int = 100):
    positions = fetch_device_positions(session, limit)
    return positions

    
@router.put("/device-positions/edit/{dId}", response_model=DevicePosition)
def edit_device_position_by_id(
        session: SessionDep,
        dId: int,
        newXPos: int,
        newYPos: int,
        roomId: int | None=None,
        user: UserPublic = Depends(require_roles("admin"))
    ):
    if((roomId is not None) and (fetch_room_by_id(session, roomId) is None)):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"RoomId does not exist: {roomId}")
    updatedDevicePos = edit_device_position(session, dId, newXPos, newYPos, roomId)
    return updatedDevicePos

    
@router.get("/device-positions/{rid}", response_model=list[DevicePosition])
def get_devices_by_room_id(session: SessionDep, rid:int):
    if not fetch_room_by_id(session, rid):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room does not exist")
    positions = fetch_device_positions_room_id(session, rid)
    return positions

        
@router.delete("/delete/{dId}", response_model=DevicePublic)
def delete_device_by_id(session: SessionDep, dId: int, user: UserPublic = Depends(require_roles("admin"))):
    device = fetch_device_by_id(session, dId)
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Device to delete not found: {dId}")
    del_confirmed = delete_device(session, dId)
    if not del_confirmed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting device {dId}")
    return device

@router.put("/{deviceId}/edit", response_model=DevicePublic)
def edit_existing_device(session: SessionDep, deviceId: int, device: EditDevice):
    if(device.deviceId != deviceId):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Edited device does not match route: {deviceId}")
    updatedDevice = edit_device(session, device)
    return updatedDevice
    