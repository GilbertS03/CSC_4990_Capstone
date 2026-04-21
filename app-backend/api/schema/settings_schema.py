from pydantic import BaseModel, ConfigDict

class SettingsBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class SettingsPublic(SettingsBase):
    settingName: str
    settingValue: int