from bcrypt import hashpw, gensalt, checkpw
from base64 import b64encode
from hashlib import sha256    

def get_pw_hash(password: str) -> str:
    sha256_hash = sha256(password.encode("utf-8")).digest()
    b64_hash = b64encode(sha256_hash)

    return hashpw(b64_hash, gensalt()).decode("utf-8")

def verify_pw(plain_pw: str, hashed_pw: str) -> bool:
    sha256_hash = sha256(plain_pw.encode("utf-8")).digest()
    b64_hash = b64encode(sha256_hash)

    try:
        return checkpw(b64_hash, hashed_pw.encode("utf-8"))
    except ValueError:
        return False