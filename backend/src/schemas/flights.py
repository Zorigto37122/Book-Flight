from datetime import datetime
from pydantic import BaseModel

from src.schemas.airports import AirportOut


class FlightOut(BaseModel):
    id: int
    airplane_id: int
    departure_time: datetime
    arrival_time: datetime
    # base_price: Decimal
    departure_airport: AirportOut
    arrival_airport: AirportOut

    class Config:
        orm_mode = True
