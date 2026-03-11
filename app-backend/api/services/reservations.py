from sqlmodel import select, Session

from ..models.Reservations import Reservations
from ..schema.reservation_schema import UserReservation

def fetch_all_reservations(session: Session):
    statement = select(Reservations)
    reservations = session.exec(statement).all()
    return [UserReservation.model_validate(res) for res in reservations]

