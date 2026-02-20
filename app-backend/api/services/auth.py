from sqlmodel import Session
from fastapi import HTTPException, status
from .users import fetch_user_by_email
from ..core.security import verify_password, create_fake_token

def login(session: Session, email: str, password: str):
    user = fetch_user_by_email(session, email)
    if not user or not verify_password(password, user.password):
        return None
    return {"access_token": create_fake_token(email), "token_type": "bearer"}