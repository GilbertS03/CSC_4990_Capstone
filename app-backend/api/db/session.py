from sqlmodel import Session
from fastapi import Depends
from typing import Annotated
from .engine import get_engine

engine = get_engine()

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]