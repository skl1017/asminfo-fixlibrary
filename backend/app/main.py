from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from app.core import config
from app.models.models import *
from app.routes import category, device, component, diagnostic, issue, solution
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],      
    allow_headers=["*"],     
)

app.include_router(category.router, prefix="/categories")
app.include_router(device.router, prefix="/devices")
app.include_router(component.router, prefix="/components")
app.include_router(diagnostic.router, prefix="/diagnostics")
app.include_router(issue.router, prefix="/issues")
app.include_router(solution.router, prefix="/solutions")


@app.exception_handler(Exception)
async def global_exception_handler(_, exc: Exception):
    print('lol')
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )

# @app.post("/category", status_code=status.HTTP_201_CREATED)
# async def create_category(category: CreateCategory):
#     return {"message": category.name}

# @app.post("/devices", status_code=status.HTTP_201_CREATED)
# async def create_category(device: CreateDevice):
#     return {"message": category.name}