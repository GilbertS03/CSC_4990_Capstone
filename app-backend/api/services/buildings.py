from sqlmodel import Session, select
from ..models.Buildings import Buildings

# def fetch_buildings(session: Session):
#     statement = select(Buildings)
#     buildings = session.exec(statement).all()