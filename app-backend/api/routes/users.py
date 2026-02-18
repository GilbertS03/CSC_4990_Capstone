from fastapi import FastAPI, APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from typing import Annotated

from ..models.Users import Users
from ..db.engine import get_engine

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

engine = get_engine()

def get_session():
    with Session(engine) as session:
        yield session    

SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

@router.get("/")
def get_users(session: SessionDep):
    try:
        users = session.exec(select(Users)).all()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {e}")