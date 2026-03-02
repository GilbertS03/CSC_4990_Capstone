from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from ..services.auth_service import authenticate_user, create_access_token
from ..models.LoginResponse import LoginResponse

from ...schema.user_schema import UserCreate
from ...db.session import SessionDep
from ...services.users import create_user, fetch_user_by_email


router = APIRouter (
    prefix='/auth',
    tags=['auth']
)

@router.post('/login')
async def login_for_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep
) -> LoginResponse:
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="incorrect username or password",
            headers={"WWW-Authenticate": "bearer"}
        )
    access_token = create_access_token(data={"email": user.email, "role": user.role.role})

    return LoginResponse(
        access_token=access_token, 
        token_type="Bearer", 
        firstName=user.firstName, 
        lastName=user.lastName, 
        weeklyHoursRemaining=user.weeklyHoursRemaining
    )

@router.post("/signup")
async def user_signup(user: UserCreate, session: SessionDep):
    existing_user = fetch_user_by_email(session, user.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    new_user = create_user(user, session)
    access_token = create_access_token(data={"email": new_user.email, "role": new_user.role.role})

    return LoginResponse(
        access_token=access_token, 
        token_type="Bearer", 
        firstName=new_user.firstName, 
        lastName=new_user.lastName, 
        weeklyHoursRemaining=new_user.weeklyHoursRemaining
    )