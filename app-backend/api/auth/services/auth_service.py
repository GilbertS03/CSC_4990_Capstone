import os
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

from ..utils.auth_utils import verify_pw
from ..models.Token import TokenData

from ...schema.user_schema import UserPublic
from ...db.session import SessionDep
from ...services.users import fetch_user_by_email

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def authenticate_user(email: str, password: str, session: SessionDep):
    user = fetch_user_by_email(session, email)
    if not user:
        print("user not found")
        return False
    if not verify_pw(password, user.password):
        print("pw not verified")
        return False
    print("Authenticated user:", user.email)
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def require_roles(*allowed_roles: str):
    async def verify_role(user: UserPublic = Depends(get_current_active_user)):
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized User"
            )
        return user
    return verify_role

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: SessionDep
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "bearer"}
    )

    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email = payload.get("email")
        role = payload.get("role")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email, role=role)
    except InvalidTokenError:
        raise credentials_exception
    user = fetch_user_by_email(session, email=token_data.email)
    if user is None:
        raise credentials_exception
    return UserPublic.model_validate(user)

async def get_current_active_user(current_user: UserPublic = Depends(get_current_user)):
    return current_user
