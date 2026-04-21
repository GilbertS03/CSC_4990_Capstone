from fastapi import APIRouter, HTTPException, status, Depends

from ..schema.device_status_schema import DeviceStatuses
from ..schema.user_schema import UserPublic
from ..services.device_status import fetch_statuses
from ..auth.services.auth_service import require_roles
from ..db.session import SessionDep

router = APIRouter(
    prefix="/device-statuses",
    tags=["device-statuses"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/", response_model=list[DeviceStatuses])
def get_all_device_statuses(session: SessionDep, user: UserPublic = Depends(require_roles("admin"))):
    return fetch_statuses(session)