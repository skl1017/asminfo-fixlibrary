from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateDevice, CreateDeviceComponentLink, ReadDevice
from app.services.device import  DeviceService

router = APIRouter()

@router.get("/search", status_code=status.HTTP_200_OK, response_model=list)
def search_devices(name: str= None, vendor_id: int = None, category_id: int = None):
    try:
        return DeviceService.search_devices(name, vendor_id, category_id)
    except Exception:
        raise

@router.get("/{device_id}", status_code=status.HTTP_200_OK, response_model=ReadDevice)
def get_device(device_id: int):
    try:
        return DeviceService.get_device(device_id)
    except Exception:
        raise


@router.post("", status_code=status.HTTP_201_CREATED)
def create_device(create_device:CreateDevice):
    try:
        return DeviceService.create_device(create_device)
    except Exception:
        raise

@router.post("/{device_id}/link-component", status_code=status.HTTP_201_CREATED)
def link_device_component(device_id:int, link_data: CreateDeviceComponentLink):
    try:
        return DeviceService.link_device_component(device_id, link_data)
    except Exception:
        raise

@router.get("/{device_id}/available-components", status_code=status.HTTP_200_OK)
def get_available_components(device_id:int):
    try:
        return DeviceService.get_available_components(device_id)
    except Exception:
        raise

    