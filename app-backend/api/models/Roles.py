from sqlmodel import SQLModel, Field

class Roles(SQLModel, table=True):
    __tablename__="Roles"

    roleId: int = Field(default=True, primary_key=True)
    role: str = Field(index=True)