from app.models.models import CreateSolution
from app.orm.models import Solution
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from app.core.config import engine
from fastapi import HTTPException

class SolutionService():
    @staticmethod
    def create_solution(create_solution: CreateSolution):
        try:
            with Session(engine) as session:
                solution = Solution(**create_solution.model_dump())
                session.add(solution)
                session.commit()
                session.refresh(solution)
                return solution
        except Exception:
            raise
    
    @staticmethod
    def get_solution(solution_id: int):
        try:
            with Session(engine) as session:
                statement = (select(Solution).where(Solution.id == solution_id))
                solution_record = session.exec(statement).first()
                if solution_record is None:
                    raise HTTPException(status_code=404, detail="Solution not found")
                return solution_record      
        except Exception:
            raise