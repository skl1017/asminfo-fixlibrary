from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateDiagnostic, ReadDiagnostic
from app.services.diagnostic import DiagnosticService

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_diagnostic(create_diagnostic: CreateDiagnostic):
    try:
        return DiagnosticService.create_diagnostic(create_diagnostic)
    except Exception:
        raise

@router.get("/{diagnostic_id}", status_code=status.HTTP_201_CREATED, response_model=ReadDiagnostic)
def get_diagnostic(diagnostic_id: int):
    try:
        return DiagnosticService.get_diagnostic(diagnostic_id)
    except Exception:
        raise