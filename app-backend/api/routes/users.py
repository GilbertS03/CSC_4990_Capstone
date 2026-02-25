from fastapi import APIRouter, HTTPException

from ..db.session import SessionDep
from..services.users import *


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)  

@router.get("/")
def get_users(session: SessionDep):
    try:
        return fetch_users(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {e}")
    
@router.get("/{user_id}")
def get_user(user_id: int, session: SessionDep):
    try:
        user = fetch_users_by_id(user_id, session)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving user: {e}")