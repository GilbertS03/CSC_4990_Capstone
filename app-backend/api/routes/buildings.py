from fastapi import APIRouter, HTTPException, status, Depends

from ..auth.services.auth_service import require_roles
from ..schema.user_schema import UserPublic
from ..db.session import SessionDep
from..services.buildings import *

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

@router.delete("/delete/{buildingId}")
def delete_building(session: SessionDep, buildingId: int, user: UserPublic = Depends(require_roles("admin"))):
    building = fetch_building_by_id(session, buildingId)
    if not building:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Building not found")
    del_confirmed = delete_building_by_id(session, buildingId)
    if not del_confirmed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error deleting building: {res.buildingId}")
    return building