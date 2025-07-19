from fastapi import APIRouter

from src.auth.authentication_backend import auth_backend
from src.auth.fastapiusers import fastapi_users

router = APIRouter()

router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)