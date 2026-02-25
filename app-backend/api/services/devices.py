from sqlmodel import Session, select

from ..models.Devices import Devices

def fetch_devices(session: Session):
    statement = select(Devices)
    devices = session.exec(statement).all()
    return devices

def fetch_device_positions(session: Session, limit: int):
    statement = select(Devices.deviceId, Devices.positionX, Devices.positionY).limit(limit)
    positions = session.exec(statement).all()
    return positions
