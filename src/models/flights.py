import datetime
from src.models.airports import AirportModel
from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, ForeignKey

class FlightModel(Base):
    __tablename__ = "flights"

    id: Mapped[int] = mapped_column(primary_key=True)
    airplane_id: Mapped[int] = mapped_column(ForeignKey("airplanes.id"))
    departure_time: Mapped[datetime.datetime]
    departure_airport_id: Mapped[int] = mapped_column(ForeignKey("airports.id"))
    arrival_time: Mapped[datetime.datetime]
    arrival_airport_id: Mapped[int] = mapped_column(ForeignKey("airports.id"))
    base_price: Mapped[int]

