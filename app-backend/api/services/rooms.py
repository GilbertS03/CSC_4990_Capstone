from sqlmodel import Session, select, func
from ..core.config_loader import settings

from ..models.Rooms import Rooms
from ..models.Buildings import Buildings
from ..models.Devices import Devices
from ..schema.rooms_schema import RoomPublic, RoomLayout

def fetch_rooms(session: Session):
    statement = select(Rooms)
    rooms = session.exec(statement).all()
    return [RoomPublic.model_validate(room) for room in rooms]

def fetch_room_by_id(session: Session, roomId: int):
    statement = select(Rooms).where(Rooms.roomId == roomId)
    room = session.exec(statement).one_or_none()
    if room is None:
        return None
    return RoomPublic.model_validate(room)

def fetch_room_layouts(session: Session, limit: int):
    statement = select(Rooms).limit(limit)
    layouts = session.exec(statement).all()
    return [RoomLayout.model_validate(room) for room in layouts]

def fetch_room_layouts_by_id(roomId: int, session: Session):
    statement = select(Rooms).where(Rooms.roomId == roomId)
    room = session.exec(statement).first()
    return RoomLayout.model_validate(room) if room else None

def fetch_rooms_by_building(buildingId: int, session: Session):
    building = session.get(Buildings, buildingId)
    if not building:
        return None
    statement = select(Rooms).where(Rooms.buildingId == buildingId)
    rooms = session.exec(statement).all()
    return [RoomPublic.model_validate(room) for room in rooms]

def fetch_available_devices_by_room(roomId: int, session: Session):
    room = session.get(Rooms, roomId)
    if not room:
        return None
    statement = select(func.count(Devices.deviceId)).where(
        Devices.roomId == roomId,
        Devices.deviceStatusId == 1
    )
    count = session.exec(statement).first()
    return count