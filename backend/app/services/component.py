from app.models.models import CreateComponent
from app.orm.models import Component
from app.core.config import engine
from sqlmodel import Session, select
from fastapi import HTTPException
from sqlalchemy.orm import selectinload

class ComponentService():
    def create_component(create_component: CreateComponent):
        try:
            with Session(engine) as session:
                component = Component(**create_component.model_dump())
                session.add(component)
                session.commit()
                session.refresh(component)
                return component
        except Exception:
            raise
