from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, devices, buildings, rooms, reservations, device_types, device_statuses, settings
from .auth.routes import auth_router


app = FastAPI()

origins = [
    "http://localhost:5173"
    "https://dvlybc03nsv3j.cloudfront.net"
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
app.include_router(reservations.router)
app.include_router(device_types.router)
app.include_router(device_statuses.router)
app.include_router(settings.router)

@app.exception_handler(HTTPException)
async def http_exception_handler(req: Request, e: HTTPException):
    return JSONResponse(
        status_code=e.status_code,
        content={"detail": e.detail}
    )

@app.exception_handler(Exception)
async def global_exception_handler(req: Request, e: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Unexpected error occured"}
    )

@app.get("/")
def read_root():
    return {"message": "This is the CRS API."}
