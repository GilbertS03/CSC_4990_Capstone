from sqlmodel import Session, select, func
from ..models.DeviceType import DeviceType
from ..schema.device_types_schema import DeviceTypes


def fetch_types(session: Session):
    statement = select(DeviceType)
    types = session.exec(statement).all()
    return [DeviceTypes.model_validate(type) for type in types]