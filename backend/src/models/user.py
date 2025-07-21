import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import Mapped

from src.models.base import Base

class User(SQLAlchemyBaseUserTableUUID, Base):
    first_name: Mapped[str]
    last_name: Mapped[str]
    sex: Mapped[str]
    birthdate: Mapped[datetime.date]
    pass

