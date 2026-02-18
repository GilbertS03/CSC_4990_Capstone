from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from typing import Annotated

from ..models.response_models.DevicePosition import DevicePosition
from ..models.Devices import Devices
from ..db.engine import get_engine

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    responses={404: {"description": "Not found"}},
)

engine = get_engine()

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

@router.get("/")
def get_devices(session: SessionDep):
    try:
        statement = select(Devices)
        devices = session.exec(statement).all()
        return devices
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving devices: {e}")


@router.get("/device-positions",  response_model=list[DevicePosition])
def get_device_positions(session: SessionDep, limit: int = 100):
    try:
        statement = select(Devices.deviceId, Devices.positionX, Devices.positionY).limit(limit)
        positions = session.exec(statement).all()
        return [DevicePosition(deviceId=dId, positionX=x, positionY=y) for dId, x, y in positions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving device positions: {e}")