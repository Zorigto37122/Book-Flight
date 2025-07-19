from fastapi import APIRouter

from src.schemas.users import UserCreate, UserRead
from src.auth.fastapiusers import fastapi_users

router = APIRouter()

router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
