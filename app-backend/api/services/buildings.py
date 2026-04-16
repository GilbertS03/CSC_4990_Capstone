from sqlmodel import Session, select
from ..core.config_loader import settings
from datetime import time

from ..models.Buildings import Buildings
from ..schema.buildings_schema import BuildingPublic, BuildingTime, BuildingCreate, BuildingUpdate

def fetch_buildings(session: Session):
    statement = select(Buildings)
    buildings = session.exec(statement).all()
    return [BuildingPublic.model_validate(building) for building in buildings]

def fetch_building_by_id(session: Session, buildingId: int):
    statement = select(Buildings).where(Buildings.buildingId == buildingId)
    building = session.exec(statement).first()
    return BuildingPublic.model_validate(building) if building else None

def fetch_building_times(session: Session, limit: int):
    statement = select(Buildings).limit(limit)
    times = session.exec(statement).all()
    return [BuildingTime.model_validate(building) for building in times]

def has_existing_building(session: Session, buildingId: int):
    statement = select(Buildings).where(
        Buildings.buildingId == buildingId
    )
    building = session.exec(statement).one_or_none()
    return building is not None

def is_valid_time(openTime: time, closeTime: time):
    if(openTime < closeTime):
        return True
    return False

def create_building(session: Session, building: BuildingCreate):
    newBuilding = Buildings.model_validate(building, update={
        "openTime" : building.openTime.replace(second=0, microsecond=0),
        "closeTime" : building.closeTime.replace(second=0, microsecond=0)
    })
    session.add(newBuilding)
    session.commit()
    session.refresh(newBuilding)

    return newBuilding

def update_building_times_and_name(session: Session, buildingId: int, building: BuildingUpdate):
    buildingData = get_building_data(session, buildingId)
    buildingData.buildingName = building.buildingName
    buildingData.openTime = building.openTime.replace(second=0, microsecond=0)
    buildingData.closeTime = building.closeTime.replace(second=0, microsecond=0)

    session.add(buildingData)
    session.commit()
    session.refresh(buildingData)

    return buildingData

def get_building_data(session: Session, buildingId: int):
    buildingData = session.get(Buildings, buildingId)
    return buildingData

def delete_building_by_id(session: Session, buildingId: int):
    building = get_building_data(session, buildingId)
    session.delete(building)
    session.commit()

    deleted = session.get(Buildings, buildingId)
    return deleted is None