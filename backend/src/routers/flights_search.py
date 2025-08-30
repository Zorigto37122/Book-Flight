from fastapi import FastAPI, Depends, Query, HTTPException, APIRouter
from typing import List, Optional, Annotated
from datetime import datetime, date, time, timedelta

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload, aliased

from src.database import get_session
from src.dependencies import SessionDep
from src.models import FlightModel, AirportModel
from src.schemas import FlightOut, AirportOut

router = APIRouter()

@router.get("/flights/search", response_model=List[FlightOut])
def search_flights(
    departure_city: str = Query(..., min_length=1),
    arrival_city: str = Query(..., min_length=1),
    departure_date: date = Query(...),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Annotated[AsyncSession, Depends(get_session)],
):
    # Build datetime range (half-open), better for indexes
    start_dt = datetime.combine(departure_date, time.min)
    end_dt = start_dt + timedelta(days=1)

    # Use aliases so join/filter is clear
    dep = aliased(AirportModel)
    arr = aliased(AirportModel)

    q = (
        db.query(FlightModel)
        .join(dep, FlightModel.departure_airport_id)
        .join(arr, FlightModel.arrival_airport_id)
        .options(joinedload(FlightModel.departure_airport_id), joinedload(FlightModel.arrival_airport_id))
        .filter(FlightModel.departure_time >= start_dt)
        .filter(FlightModel.departure_time < end_dt)
        .filter(dep.city.ilike(f"%{departure_city}%"))
        .filter(arr.city.ilike(f"%{arrival_city}%"))
        .order_by(FlightModel.departure_time.asc())
    )

    total = q.count()  # optional if you want total for pagination UI
    results = q.offset((page - 1) * per_page).limit(per_page).all()

    if not results:
        # return empty list (FastAPI will serialize) or 404 depending on UX
        return []

    return results
