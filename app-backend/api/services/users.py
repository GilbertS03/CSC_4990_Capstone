from sqlmodel import Session, select

from ..models.User import User

def fetch_users(session: Session):
    statement = select(User)
    users = session.exec(statement).all()
    return users

def fetch_users_by_id(userId: int, session: Session):
    statement = select(User).where(User.userId == userId)
    user = session.exec(statement).first()
    return user

def fetch_user_by_email(session: Session, email: str):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user