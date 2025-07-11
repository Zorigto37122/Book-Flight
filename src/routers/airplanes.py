from fastapi import APIRouter

from src.models.airplanes import AirplaneModel
from src.schemas.airplanes import AirplaneAddSchema
from src.dependencies import SessionDep

router = APIRouter()


@router.post("/airplanes")
async def add_airplane(airplane: AirplaneAddSchema, session: SessionDep):
    new_airplane = AirplaneModel(
        model=airplane.model,
        seats_count=airplane.seats_count
    )
    session.add(new_airplane)
    await session.commit()