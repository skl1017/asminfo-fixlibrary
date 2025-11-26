from fastapi import FastAPI
from app.core import config
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}