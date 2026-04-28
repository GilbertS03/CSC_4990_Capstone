from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CreateClosure(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    buildingId: int
    openTime: datetime
    closeTime: datetime
