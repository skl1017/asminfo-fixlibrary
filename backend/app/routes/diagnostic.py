from fastapi import  status, APIRouter
from app.models.models import CreateDiagnostic, ReadDiagnostic
from app.services.diagnostic import DiagnosticService

router = APIRouter()

@router.get("/search", status_code=status.HTTP_200_OK, response_model=list[ReadDiagnostic])
def search_diagnostics(device_name: str = None, title: str= None, vendor_id: int = None, category_id: int = None):
    try:
        return DiagnosticService.search_diagnostics(device_name, title, vendor_id, category_id)
    except Exception:
        raise

@router.get("", status_code=status.HTTP_200_OK)
def get_diagnostic_list():
    try:
        return DiagnosticService.get_diagnostic_list()
    except Exception:
        raise

@router.post("", status_code=status.HTTP_201_CREATED)
def create_diagnostic(create_diagnostic: CreateDiagnostic):
    try:
        return DiagnosticService.create_diagnostic(create_diagnostic)
    except Exception:
        raise

@router.get("/{diagnostic_id}", status_code=status.HTTP_200_OK, response_model=ReadDiagnostic)
def get_diagnostic(diagnostic_id: int):
    try:
        return DiagnosticService.get_diagnostic(diagnostic_id)
    except Exception:
        raise

