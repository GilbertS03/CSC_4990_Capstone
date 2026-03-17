from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, devices, buildings, rooms
from .auth.routes import auth_router


app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users.router)
app.include_router(devices.router)
app.include_router(buildings.router)
app.include_router(rooms.router)
app.include_router(auth_router.router)

@app.get("/")
def read_root():
    return {"message": "This is the CRS API."}