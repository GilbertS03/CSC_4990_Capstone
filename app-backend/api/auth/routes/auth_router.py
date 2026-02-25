from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from ..models.token import Token
from ...db.session import SessionDep
from ..services.auth_service import authenticate_user, create_access_token

router = APIRouter (
    prefix='/auth',
    tags=['auth']
)

@router.post('/token')
async def login_for_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep
) -> Token:
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = create_access_token(data={"sub": user.email})

    return Token(access_token=access_token, token_type="Bearer")