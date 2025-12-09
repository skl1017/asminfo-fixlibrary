from app.models.models import CreateCategory
from app.orm.models import Category
from app.core.config import engine
from sqlmodel import Session, select
from fastapi import HTTPException
from sqlalchemy.orm import selectinload


class CategoryService:
    def get_category_list():
        try:
            with Session(engine) as session:
                statement = select(Category)
                categories = session.exec(statement).all()
                return categories      
        except Exception:
            raise
    
    def create_category(create_category:CreateCategory):
        category_record = Category(
        name=create_category.name)
        try: 
            with Session(engine) as session:
                session.add(category_record)
                session.commit()
                session.refresh(category_record)
                return category_record
        except Exception:
            raise

    def get_category(category_id: int):
        try:
            with Session(engine) as session:
                statement = (select(Category).where(Category.id == category_id).options(selectinload(Category.devices)))
                category_record = session.exec(statement).first()
                if category_record is None:
                    raise HTTPException(status_code=404, detail="Category not found")
                return category_record      
        except Exception:
            raise
    
    def search_categories(name: str = None):
        conditions = []
        if name is not None:
            conditions.append(Category.name.ilike(f"%{name}%"))
        try:
            with Session(engine) as session:
                statement = (
                    select(Category)
                    .where(*conditions))
                categories_record = session.exec(statement).all()
                if categories_record is None:
                    raise HTTPException(status_code=404, detail="Device not found")
                return categories_record      
        except Exception:
          raise