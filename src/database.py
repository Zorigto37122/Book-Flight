from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

SQLALCHEMY_DATABASE_URL = 'postgresql+asyncpg://fastapiuser:puppet88@localhost:5432/fastapi'

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

new_session = async_sessionmaker(engine, expire_on_commit=False)

async def get_session():
    async with new_session() as session:
        yield session


class Base(DeclarativeBase):
    pass
