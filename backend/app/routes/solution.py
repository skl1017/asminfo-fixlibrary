from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateSolution
from app.services.solution import SolutionService

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_solution(create_solution: CreateSolution):
    try:
        return SolutionService.create_solution(create_solution)
    except Exception:
        raise