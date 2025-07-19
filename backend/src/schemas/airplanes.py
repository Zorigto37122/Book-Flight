from pydantic import BaseModel

class AirplaneAddSchema(BaseModel):
    model: str
    seats_count: int