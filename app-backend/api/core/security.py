def fake_hash_password(password: str):
    return password + "hash"

def verify_password(plain: str, hashed: str):
    return fake_hash_password(plain) == hashed

def create_fake_token(email: str):
    return email + "token"