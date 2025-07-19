import uuid

from fastapi_users import FastAPIUsers

from src.auth.authentication_backend import auth_backend
from src.auth.user_manager import get_user_manager
from src.models.user import User

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)