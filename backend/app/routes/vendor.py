from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateVendor
from app.services.vendor import VendorService

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_vendor_list():
    try:
        return VendorService.get_vendor_list()
    except Exception:
        raise

# @router.get("/{solution_id}", status_code=status.HTTP_200_OK)
# def get_issue(solution_id: int):
#     try:
#         return SolutionService.get_solution(solution_id)
#     except Exception:
#         raise

@router.post("", status_code=status.HTTP_201_CREATED)
def create_vendor(create_vendor: CreateVendor):
    try:
        return VendorService.create_vendor(create_vendor)
    except Exception:
        raise