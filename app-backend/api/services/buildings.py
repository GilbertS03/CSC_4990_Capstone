from sqlmodel import Session, select
from ..core.config_loader import settings

from ..models.Buildings import Buildings
from ..schema.buildings_schema import BuildingPublic, BuildingTime

def fetch_buildings(session: Session):
    statement = select(Buildings)
    buildings = session.exec(statement).all()
    return [BuildingPublic.model_validate(building) for building in buildings]

def fetch_building_times(session: Session, limit: int):
    statement = select(Buildings).limit(limit)
    times = session.exec(statement).all()
    return [BuildingTime.model_validate(building) for building in times]