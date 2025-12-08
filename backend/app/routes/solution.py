from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateSolution
from app.services.solution import SolutionService

router = APIRouter()

@router.get("/{solution_id}", status_code=status.HTTP_200_OK)
def get_issue(solution_id: int):
    try:
        return SolutionService.get_solution(solution_id)
    except Exception:
        raise

@router.post("", status_code=status.HTTP_201_CREATED)
def create_solution(create_solution: CreateSolution):
    try:
        return SolutionService.create_solution(create_solution)
    except Exception:
        raise