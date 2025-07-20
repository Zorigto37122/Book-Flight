import uvicorn
from fastapi import FastAPI
from src.routers import main_router
import sys
app = FastAPI()
app.include_router(main_router)

@app.get("/")
async def root():
    return {"message": "API works!"}

if __name__ == '__main__':
    print(sys.path)
    uvicorn.run("src.main:app",  reload=True)