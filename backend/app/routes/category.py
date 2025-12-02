from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateCategory, ReadCategory
from app.services.category import CategoryService

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_categories():
    return CategoryService.get_category_list()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_category(create_category:CreateCategory):
    try:
        return CategoryService.create_category(create_category)
    except Exception:
        raise
    
@router.get('/{category_id}', status_code=status.HTTP_200_OK, response_model=ReadCategory)
def get_category(category_id: int):
    return CategoryService.get_category(category_id)

