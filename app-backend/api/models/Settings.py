from sqlmodel import SQLModel, Field

class DefaultSettings(SQLModel, table=True):
    __tablename__ = "Settings"

    settingName: str = Field(default=None, primary_key=True)
    settingValue: int
