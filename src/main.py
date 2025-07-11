import uvicorn
from fastapi import FastAPI
from src.routers import main_router
app = FastAPI()
app.include_router(main_router)

if __name__ == '__main__':
    uvicorn.run("src.main:app", reload=True)