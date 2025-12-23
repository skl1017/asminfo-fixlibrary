from app.models.models import CreateDiagnostic
from app.orm.models import Diagnostic, Device
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
                diagnostic_record = session.exec(statement).first()
                if diagnostic_record is None:
                    raise HTTPException(status_code=404, detail="Issue not found")
                return diagnostic_record      
        except Exception:
            raise

    @staticmethod
    def get_diagnostic_list():
        try:
            with Session(engine) as session:
                return session.exec(select(Diagnostic)).all()
        except Exception:
            raise

    @staticmethod
    def search_diagnostics(device_name: str = None, title: str= None, vendor_id: int = None, category_id: int = None):
        conditions = []
        if vendor_id is not None:
            conditions.append(Device.vendor_id == vendor_id)
        if category_id is not None:
            conditions.append(Device.category_id == category_id)
        if title:
            conditions.append(Diagnostic.title.ilike(f"%{title}%"))
        if device_name:
            conditions.append(Device.name.ilike(f"%{device_name}%"))
        try:
            with Session(engine) as session:
                statement = (
                    select(Diagnostic)
                    .join(Device)
                    .where(*conditions)
                    .options(
                        selectinload(Diagnostic.issues),
                        selectinload(Diagnostic.device)))
                diagnostic_record = session.exec(statement).all()
                if diagnostic_record is None:
                    raise HTTPException(status_code=404, detail="Device not found")
                return diagnostic_record      
        except Exception:
            raise