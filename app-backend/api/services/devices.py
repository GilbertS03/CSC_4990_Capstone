from sqlmodel import Session, select

from ..models.Devices import Devices, DeviceStatus
from ..schema.devices_schema import DevicePublic, DevicePosition, CreateDevice

UNAVAILABLE_STATUS = 2

def fetch_all_devices(session: Session):
    statement = select(Devices)
    devices = session.exec(statement).all()
    return [DevicePublic.model_validate(device) for device in devices]

def convert_to_db_model(session: Session, dId: int):
    db_obj = session.get(Devices, dId)
    return db_obj

def fetch_device_by_id(session: Session, deviceId: int):
    statement = select(Devices).where(Devices.deviceId == deviceId)
    device = session.exec(statement).one_or_none()
    return DevicePublic.model_validate(device) if device else None

def fetch_devices_status_by_room(session: Session, status: str, roomId: int | None = None):
    statement = select(Devices).join(DeviceStatus).where(DeviceStatus.deviceStatus == status)
    if roomId:
        statement = statement.where(Devices.roomId == roomId)
    devices = session.exec(statement).all()
    return [DevicePublic.model_validate(device) for device in devices]

def fetch_device_positions(session: Session, limit: int):
    statement = select(Devices).limit(limit)
    positions = session.exec(statement).all()
    return [DevicePosition.model_validate(device) for device in positions]

def fetch_device_positions_room_id(session: Session, id: int):
    statement = select(Devices).where(Devices.roomId == id)
    positions = session.exec(statement).all()
    return [DevicePosition.model_validate(device) for device in positions]

def edit_device_position(session: Session, id: int, newX: int, newY: int):
    statement = select(Devices).where(Devices.deviceId == id)
    device = session.exec(statement).one()
    device.positionX = newX
    device.positionY = newY

    session.add(device)
    session.commit()
    session.refresh(device)

    return device

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

def delete_device(session: Session, deviceId: int):
    device = convert_to_db_model(session, deviceId)

    session.delete(device)
    session.commit()

    deleted = session.get(Devices, deviceId)
    return deleted is None

def edit_device(session: Session, device: DevicePublic):
    statement = select(Devices).where(Devices.deviceId == device.deviceId)
    dbDevice = session.exec(statement).one_or_none()
