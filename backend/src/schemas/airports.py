from typing import Optional

from pydantic import BaseModel

class AirportOut(BaseModel):
    id: int
    code: str
    city: str
    name: Optional[str]

    class Config:
        orm_mode = True