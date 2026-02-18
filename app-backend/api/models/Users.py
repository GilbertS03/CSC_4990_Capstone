from sqlmodel import SQLModel, Field

class Users(SQLModel, table=True):
    __tablename__ = "Users"

    userId: int = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    email: str
    password: str
    role: str = Field(index=True)
    weeklyHoursRemaining: float