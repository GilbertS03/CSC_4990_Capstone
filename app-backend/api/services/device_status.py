from sqlmodel import Session, select

from ..schema.device_status_schema import DeviceStatuses
from ..models.DeviceStatus import DeviceStatus


def fetch_statuses(session: Session):
    statement = select(DeviceStatus)
    statuses = session.exec(statement).all()
    return [DeviceStatuses.model_validate(status) for status in statuses]


def status_to_id(session: Session, status: str):
    statement = select(DeviceStatus.deviceStatusId).where(DeviceStatus.deviceStatus == status)
    statusId = session.exec(statement).one_or_none()
    return statusId