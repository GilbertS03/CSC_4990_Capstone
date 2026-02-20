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

def fetch_user_by_email(session: Session, email: str):
    statement = select(Users).where(Users.email == email)
    user = session.exec(statement).first()
    return user