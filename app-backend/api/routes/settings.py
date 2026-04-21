from fastapi import APIRouter, HTTPException, status, Depends

from ..auth.services.auth_service import require_roles, get_current_active_user
from ..db.session import SessionDep
from ..services.settings import *
from ..services.users import UserPublic

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
    responses={404: {"description": "Not found"}},
)  

@router.get("/", response_model=list[SettingsPublic])
def get_all_settings(session: SessionDep, user: UserPublic = Depends(require_roles("admin")), ):
    return fetch_settings(session)

@router.put("/edit/{settingName}", response_model=SettingsPublic)
def update_setting_value(
    settingName: str,
    newValue: int,
    session: SessionDep,
    user: UserPublic = Depends(require_roles("admin"))
):
    updated_setting = update_settingValue(session, settingName, newValue)
    
    if updated_setting is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Setting: '{settingName}' not found"
        )
    
    return SettingsPublic.model_validate(updated_setting)