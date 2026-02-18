from fastapi import APIRouter, HTTPException, Depends
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

@router.get("/")
def get_users(session: SessionDep):
    try:
        users = session.exec(select(Users)).all()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {e}")
    
@router.get("/{user_id}")
def get_user(user_id: int, session: SessionDep):
    try:
        statement = select(Users).where(Users.userId == user_id)
        user = session.exec(statement).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving user: {e}")