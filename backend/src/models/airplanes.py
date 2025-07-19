from src.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column

class AirplaneModel(Base):
    __tablename__ = "airplanes"

    id: Mapped[int] = mapped_column(primary_key=True)
    model: Mapped[str]
    seats_count: Mapped[int]

