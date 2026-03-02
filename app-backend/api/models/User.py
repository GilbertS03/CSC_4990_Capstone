from sqlmodel import SQLModel, Field, Relationship

from .Roles import Roles

class User(SQLModel, table=True):
    __tablename__ = "Users"

    userId: int = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    email: str
    password: str
    weeklyHoursRemaining: float
    roleId: int = Field(index=True, foreign_key="Roles.roleId")
    role: "Roles" = Relationship()