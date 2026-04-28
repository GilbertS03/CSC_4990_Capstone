from sqlmodel import select, Session
from datetime import datetime
from ..schema.building_closure_schema import CreateClosure
from ..models.Closures import Closures
from ..services.buildings import *


def fetch_building_closures(session: Session):
    statement = select(Closures)
    closures = session.exec(statement).all()
    return [closures]

def closure_exists(session: Session, buildingId: int, startClose: datetime, endClose: datetime):
    statement = select(Closures).where(
        Closures.buildingId == buildingId,
        Closures.openTime < endClose,
        Closures.closeTime > startClose
    )
    closure = session.exec(statement).one_or_none()
    return closure

def close_building(session: Session, building: CreateClosure):
    newClosure = Closures.model_validate(building)

    session.add(newClosure)
    session.commit()
    session.refresh(newClosure)

    return newClosure