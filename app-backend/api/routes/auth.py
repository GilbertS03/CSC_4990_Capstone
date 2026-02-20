from fastapi import APIRouter, HTTPException

from ..db.session import SessionDep
from ..services.auth import login
from ..models.LoginForm import LoginForm

router = APIRouter(
    prefix="/login",
    tags=["login"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
def login_route(body: LoginForm, session: SessionDep):
    result = login(session, body.email, body.password)
    if not result:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return result