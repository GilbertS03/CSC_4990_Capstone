from fastapi import FastAPI
from .routes import users, devices, auth

app = FastAPI()

app.include_router(users.router)
app.include_router(devices.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "This is the CRS API."}