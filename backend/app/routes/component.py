from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateComponent
from app.services.component import ComponentService 

router =  APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_component(create_component:CreateComponent):
    try:
        return ComponentService.create_component(create_component)
    except Exception:
        raise