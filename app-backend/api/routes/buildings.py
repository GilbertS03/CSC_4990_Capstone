from fastapi import APIRouter, HTTPException

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