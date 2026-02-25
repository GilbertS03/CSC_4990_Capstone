from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    __tablename__ = "Users"

    userId: int = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    email: str
    password: str
    weeklyHoursRemaining: float
    roleId: int