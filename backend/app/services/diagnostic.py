from app.models.models import CreateDiagnostic
from app.orm.models import Diagnostic
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from app.core.config import engine
from fastapi import HTTPException

class DiagnosticService():
    @staticmethod
    def create_diagnostic(create_diagnostic: CreateDiagnostic):
        try:
            with Session(engine) as session:
                diagnostic = Diagnostic(**create_diagnostic.model_dump())
                session.add(diagnostic)
                session.commit()
                session.refresh(diagnostic)
                return diagnostic
        except Exception:
            raise
    
    @staticmethod
    def get_diagnostic(diagnostic_id: int):
        try:
            with Session(engine) as session:
                statement = (
                    select(Diagnostic)
                    .where(Diagnostic.id == diagnostic_id)
                    .options(
                        selectinload(Diagnostic.issues),
                        selectinload(Diagnostic.device)))
                device_record = session.exec(statement).first()
                if device_record is None:
                    raise HTTPException(status_code=404, detail="Issue not found")
                return device_record      
        except Exception:
            raise
