from fastapi import APIRouter, HTTPException

from ..schema.devices_schema import DevicePosition, DevicePublic
from ..db.session import SessionDep
from ..services.devices import *

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[DevicePublic])
def get_devices(session: SessionDep):
    try:
        devices = fetch_devices(session)
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