from src.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column

class AirportModel(Base):
    __tablename__ = "airports"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str]
    city: Mapped[str]
    name: Mapped[str]