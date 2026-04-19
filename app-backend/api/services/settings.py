from sqlmodel import Session, select
from ..models.Settings import DefaultSettings
from ..schema.settings_schema import SettingsPublic

def fetch_settings(session: Session):
    statement = select(DefaultSettings)
    settings = session.exec(statement).all()
    return [SettingsPublic.model_validate(setting) for setting in settings]

def fetch_settingValue_by_name(session: Session, name: str):
    statement = select(DefaultSettings).where(DefaultSettings.settingName == name)
    setting = session.exec(statement).one_or_none()
    return setting.settingValue

def update_settingValue(session: Session, name: str, newValue: int):
    statement = select(DefaultSettings).where(DefaultSettings.settingName == name)
    setting = session.exec(statement).one_or_none()
    if setting is None:
        return None
    setting.settingValue = newValue
    session.add(setting)
    session.commit()
    return setting