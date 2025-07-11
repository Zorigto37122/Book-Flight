from datetime import datetime

import sqlalchemy
from sqlalchemy import ForeignKey

from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column

class TicketModel(Base):
    __tablename__ = "tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    #user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    flight_id: Mapped[int] = mapped_column(ForeignKey("flights.id"))
    seat_id: Mapped[int] = mapped_column(ForeignKey("seats.id"))
    status: Mapped[float]
    created_at: Mapped[datetime]

