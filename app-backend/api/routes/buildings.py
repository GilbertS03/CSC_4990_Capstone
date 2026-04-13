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
    try:
        return fetch_buildings(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving buildings: {e}")
    
@router.get("/all-hours", response_model=list[BuildingTime])
def get_all_building_hours(session: SessionDep, limit: int = 100):
    try:
        return fetch_building_times(session, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")
    
@router.post("/create")
def create_new_building(session: SessionDep, building: BuildingCreate, user: UserPublic = Depends(require_roles("admin"))):
    if has_existing_building(session, building.buildingId):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Building already exists")
    if not is_valid_time(building.openTime, building.closeTime):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid building open and close times")
    new_building = create_building(session, building)
    return new_building