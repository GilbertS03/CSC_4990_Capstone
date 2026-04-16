from sqlmodel import Session, select
from ..core.config_loader import settings

from ..models.User import User
from ..schema.user_schema import UserPublic, UserCreate
from ..models.Roles import Roles
from ..auth.utils.auth_utils import get_pw_hash

DEFAULT_ROLE = settings.DEFAULT_ROLE
DEFAULT_HOURS = settings.DEFAULT_WEEKLY_HOURS


def fetch_users(session: Session):
    statement = select(User)
    users = session.exec(statement).all()
    return [UserPublic.model_validate(user) for user in users]

def fetch_user_role(session: Session, email: str):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user:
        return None
    role_statement = select(Roles).where(Roles.roleId == user.roleId)
    role = session.exec(role_statement).first()
    return role

def fetch_users_by_id(userId: int, session: Session):
    statement = select(User).where(User.userId == userId)
    user = session.exec(statement).one()
    return UserPublic.model_validate(user) if user else None

def create_user(user: UserCreate, session: Session):
    hashed_pw = get_pw_hash(user.password)

    newUser = User.model_validate(user, update={
        "password": hashed_pw,
        "roleId": DEFAULT_ROLE,
        "weeklyHoursRemaining": DEFAULT_HOURS
    })

    session.add(newUser)
    session.commit()

    return newUser

def fetch_user_by_email(session: Session, email: str):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user

def convert_user_to_db_model(session: Session, userId: int):
    db_data = session.get(User, userId)
    return db_data

def update_user_hours(session: Session, userId: int, newHours: int):
    statement =  select(User).where(User.userId == userId )
    user = session.exec(statement).one_or_none()
    if user is None:
        return None
    user.weeklyHoursRemaining = newHours
    session.add(user)
    session.commit()
    return user
    

def subtract_user_hours(session: Session, userId: int, hoursDiff: float):
    user = session.get(User, userId)

    newHours = user.weeklyHoursRemaining - hoursDiff

    user.weeklyHoursRemaining = newHours
    session.add(user)
    session.commit()
    updatedHours = session.get(User, userId).weeklyHoursRemaining
    return updatedHours

def add_user_hours(session: Session, userId: int, hoursDiff: float):
    user = session.get(User, userId)

    newHours = user.weeklyHoursRemaining + hoursDiff

    user.weeklyHoursRemaining = newHours
    session.add(user)
    session.commit()
    updatedHours = session.get(User, userId).weeklyHoursRemaining
    return updatedHours

def role_to_id(session: Session, role: str):
    statement = select(Roles.roleId).where(Roles.role == role)
    id = session.exec(statement).one_or_none()
    return id

def update_user_role(session: Session, userId: int, roleId: int):
     statement =  select(User).where(User.userId == userId )
     user = session.exec(statement).one_or_none()
     if user is None:
        return None
     user.roleId = roleId
     session.add(user)
     session.commit()
     updatedRole = session.get(User, userId)
     return updatedRole

def delete_user(session: Session, userId: int):
    modeledUser = convert_user_to_db_model(session, userId)
    session.delete(modeledUser)
    session.commit()

    deleted = session.get(User, userId)
    return deleted is None
    