from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateCategory, ReadCategory
from app.services.category import CategoryService

router = APIRouter()

@router.get('/search', status_code=status.HTTP_200_OK)
def search_categories(name: str):
    try:
        return CategoryService.search_categories(name)
    except Exception:
        raise

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
    try:
        return CategoryService.get_category(category_id)
    except Exception:
        raise

