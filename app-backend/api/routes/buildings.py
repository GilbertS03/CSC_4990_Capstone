from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from ..auth.services.auth_service import require_roles
from ..schema.user_schema import UserPublic
from ..db.session import SessionDep
from..services.buildings import *
from ..services.reservations import fetch_reservations_by_building

router = APIRouter(
    prefix="/buildings",
    tags=["buildings"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/", response_model=list[BuildingPublic])
def get_buildings(session: SessionDep):
        return fetch_buildings(session)
    
@router.get("/all-hours", response_model=list[BuildingTime])
def get_all_building_hours(session: SessionDep, limit: int = 100):
        return fetch_building_times(session, limit)
    
@router.post("/create")
def create_new_building(session: SessionDep, building: BuildingCreate, user: UserPublic = Depends(require_roles("admin"))):
    if has_existing_building(session, building.buildingId):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Building already exists")
    if not is_valid_time(building.openTime, building.closeTime):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid building open and close times")
    new_building = create_building(session, building)
    return new_building

@router.put("/edit/{buildingId}")
def update_building(session: SessionDep, buildingId: int, building: BuildingUpdate, user: UserPublic = Depends(require_roles("admin"))):
    if not has_existing_building(session, buildingId):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Building not found")
    if not is_valid_time(building.openTime, building.closeTime):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid building open and close times")
    updated_building = update_building_times_and_name(session, buildingId, building)
    return updated_building

@router.delete("/delete/{buildingId}")
def delete_building(session: SessionDep, buildingId: int, user: UserPublic = Depends(require_roles("admin"))):
    building = fetch_building_by_id(session, buildingId)
    if not building:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Building not found")
    del_confirmed = delete_building_by_id(session, buildingId)
    if not del_confirmed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting building: {building.buildingId}")
    return building

@router.get("/{buildingId}/reservations")
def get_reservations_by_building_and_times(session: SessionDep, buildingId: int, resStart: datetime, resEnd: datetime):
    reservations = fetch_reservations_by_building(session, buildingId, resStart, resEnd)
    if len(reservations) == 0:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No reservations found for building {buildingId}")
    return reservations