import os
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

from ..utils.auth_utils import verify_pw
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

