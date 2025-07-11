from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

class SeatModel(Base):
    __tablename__ = "seats"

    id: Mapped[int] = mapped_column(primary_key=True)
    airplane_id: Mapped[int] = mapped_column(ForeignKey("airplanes.id"))
    seat_number: Mapped[str]
    seat_class: Mapped[str]
