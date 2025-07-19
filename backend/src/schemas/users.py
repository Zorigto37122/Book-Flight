import datetime
import uuid
from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    first_name: str
    last_name: str
    sex: str
    birthdate: Optional[datetime.date]


class UserCreate(schemas.BaseUserCreate):
    first_name: str
    last_name: str
    sex: str
    birthdate: Optional[datetime.date]


class UserUpdate(schemas.BaseUserUpdate):
    first_name: Optional[str]
    last_name: Optional[str]
    sex: Optional[str]
    birthdate: Optional[datetime.date]