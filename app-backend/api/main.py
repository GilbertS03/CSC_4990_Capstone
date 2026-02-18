from fastapi import FastAPI
from .routes import users, devices

app = FastAPI()

app.include_router(users.router)
app.include_router(devices.router)

@app.get("/")
def read_root():
    return {"message": "This is the CRS API."}