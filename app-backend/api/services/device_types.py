from sqlmodel import Session, select
from ..models.DeviceType import DeviceType
from ..schema.device_types_schema import DeviceTypes


def fetch_types(session: Session):
    statement = select(DeviceType)
    types = session.exec(statement).all()
    return [DeviceTypes.model_validate(type) for type in types]

def type_to_id(session: Session, type: str):
    statement = select(DeviceType.deviceTypeId).where(DeviceType.deviceType == type)
    typeId = session.exec(statement).one_or_none()
    return typeId