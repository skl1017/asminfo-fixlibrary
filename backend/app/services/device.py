from app.models.models import CreateDevice
from app.orm.models import Device
from app.core.config import engine
from sqlmodel import Session, select
from fastapi import HTTPException
from sqlalchemy.orm import selectinload

class DeviceService():
    @staticmethod
    def create_device(create_device: CreateDevice):
        with Session(engine) as session:
            db_device = Device(**create_device.model_dump())
            session.add(db_device)
            session.commit()
            session.refresh(db_device)
            return db_device
    
