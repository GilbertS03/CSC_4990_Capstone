from fastapi import APIRouter, HTTPException, Depends

from ..auth.services.auth_service import require_roles, get_current_active_user
from ..db.session import SessionDep
from ..services.users import *


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)  

@router.get("/", response_model=list[UserPublic])
def get_users(session: SessionDep, user: UserPublic = Depends(require_roles("admin")), ):
    try:
        return fetch_users(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {e}")
    

    
@router.get("/me", response_model=UserPublic)
def get_active_user(user: UserPublic = Depends(get_current_active_user)):
    try:
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving user: {e}")

@router.get("/{user_id}", response_model=UserPublic)
def get_user(user_id: int, session: SessionDep, userRole: UserPublic = Depends(require_roles("admin"))):
    try:
        user = fetch_users_by_id(user_id, session)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving user: {e}")