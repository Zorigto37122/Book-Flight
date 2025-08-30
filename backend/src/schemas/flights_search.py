from datetime import datetime

from pydantic import BaseModel

class FlightSearchRequest(BaseModel):
    departure_airport_code: str | None = None
    arrival_airport_code: str | None = None
    departure_time: datetime | None = None
