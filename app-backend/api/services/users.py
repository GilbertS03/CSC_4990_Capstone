from sqlmodel import Session, select

from ..models.Users import Users

def fetch_users(session: Session):
    statement = select(Users)
    users = session.exec(statement).all()
    return users

def fetch_users_by_id(userId: int, session: Session):
    statement = select(Users).where(Users.userId == userId)
    user = session.exec(statement).first()
    return user