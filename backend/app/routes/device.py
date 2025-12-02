from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateDevice
from app.services.device import  DeviceService

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_device(create_device:CreateDevice):
    try:
        return DeviceService.create_device(create_device)
    except Exception:
        raise
    