from fastapi import APIRouter, HTTPException, status, Depends

from ..auth.services.auth_service import require_roles, get_current_active_user
from ..db.session import SessionDep
from ..services.users import *


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)  

@router.get("/all", response_model=list[UserPublic])
def get_users(session: SessionDep, user: UserPublic = Depends(require_roles("admin")), ):
    return fetch_users(session)

    
@router.get("/me", response_model=UserPublic)
def get_active_user(user: UserPublic = Depends(get_current_active_user)):
    return user


@router.get("/{user_id}", response_model=UserPublic)
def get_user(user_id: int, session: SessionDep, userRole: UserPublic = Depends(require_roles("admin"))):
    user = fetch_users_by_id(user_id, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

    
@router.put("/edit/{user_id}", response_model=UserPublic)
def update_role(session: SessionDep,user_id: int, role: str | None = None , weeklyHours: int | None = None, userRole: UserPublic = Depends(require_roles("admin"))):
    if role:
        roleId = role_to_id(session, role)
        if roleId is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Role does not exist")
        update_user_role(session, user_id, roleId)
    if weeklyHours:
        update_user_hours(session, user_id, weeklyHours)
    user = fetch_users_by_id(user_id, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User Not Found")
    return user 

    
@router.delete("/delete/{user_id}", response_model= UserPublic)
def delete_user_account(session: SessionDep, user_id: int, userRole: UserPublic = Depends(require_roles("admin"))):
    user = fetch_users_by_id(user_id, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User Not Found")
    deletedUser = delete_user(session, user_id)
    if not deletedUser:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error Deleting User: {user.userId}")
    return user
