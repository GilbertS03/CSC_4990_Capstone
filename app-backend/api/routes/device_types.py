from fastapi import APIRouter, HTTPException, status, Depends

from ..schema.device_types_schema import DeviceTypes
from ..schema.user_schema import UserPublic
from ..services.device_types import fetch_types
from ..auth.services.auth_service import require_roles
from ..db.session import SessionDep

router = APIRouter(
    prefix="/device-types",
    tags=["device-types"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/", response_model=list[DeviceTypes])
def get_all_device_types(session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    return fetch_types(session)