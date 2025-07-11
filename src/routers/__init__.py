from fastapi import APIRouter

from src.database import engine, Base
from src.routers.airplanes import router as airplanes_router
from src.models import *

main_router = APIRouter()

main_router.include_router(airplanes_router)


@main_router.get('/setup_database')
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    return {"message": "Database setup successful"}
