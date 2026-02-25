import os
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

from ..utils.auth_utils import verify_pw
from ..models.token import TokenData

from ...models.User import User
from ...db.session import SessionDep
from ...services.users import fetch_user_by_email

load_dotenv()
# secret key and hash alg vars
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# authenticate user
def authenticate_user(email: str, password: str, session: SessionDep):
    user = fetch_user_by_email(session, email)
    if not user:
        return False
    if not verify_pw(password, user.password):
        return False
    return user

#create access token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#async get current user
async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: SessionDep
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except InvalidTokenError:
        raise credentials_exception
    user = fetch_user_by_email(session, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
#async get current active user
async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user
