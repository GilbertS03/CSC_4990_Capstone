from sqlmodel import Session, select
from ..core.config_loader import settings

from ..models.Rooms import Rooms
from ..schema.rooms_schema import RoomPublic, RoomLayout

def fetch_rooms(session: Session):
    statement = select(Rooms)
    rooms = session.exec(statement).all()
    return [RoomPublic.model_validate(room) for room in rooms]