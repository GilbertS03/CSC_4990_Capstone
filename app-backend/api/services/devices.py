from sqlmodel import Session, select

from ..models.Devices import Devices
from ..schema.devices_schema import DevicePublic, DevicePosition, CreateDevice

UNAVAILABLE_STATUS = 2

def fetch_all_devices(session: Session):
    statement = select(Devices)
    devices = session.exec(statement).all()
    return [DevicePublic.model_validate(device) for device in devices]

def fetch_device_positions(session: Session, limit: int):
    statement = select(Devices).limit(limit)
    positions = session.exec(statement).all()
    return [DevicePosition.model_validate(device) for device in positions]

def fetch_device_positions_room_id(session: Session, id:int):
    statement = select(Devices).where(Devices.roomId == id)
    positions = session.exec(statement).all()
    return [DevicePosition.model_validate(device) for device in positions]

def create_device(session: Session, device: CreateDevice):
    new_device = Devices.model_validate(device, update={
        "roomId": 0,
        "positionX":  0,
        "positionY": 0,
        "deviceStatusId": UNAVAILABLE_STATUS
    })
    
    session.add(new_device)
    session.commit()
    session.refresh(new_device)

    return new_device