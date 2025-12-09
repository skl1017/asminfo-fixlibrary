from app.models.models import CreateDevice, CreateDeviceComponentLink
from app.orm.models import Device, Component, DeviceComponentLink
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
        
    @staticmethod
    def link_device_component(link_data:  CreateDeviceComponentLink):
        with Session(engine) as session:
            device = session.get(Device, link_data.device_id)
            if not device:
                raise HTTPException(404, "Device not found")
            component = session.get(Component, link_data.component_id)
            if not component:
                raise HTTPException(404, "Component not found")
            
            link = DeviceComponentLink(device_id=device.id, component_id=component.id)
            session.add(link)
            session.commit()
            return {"device_id": device.id, "component_id": component.id, "message": "Component linked successfully"}
    
    @staticmethod
    def get_device(device_id:int):
        try:
            with Session(engine) as session:
                statement = (
                    select(Device)
                    .where(Device.id == device_id)
                    .options(
                        selectinload(Device.components),
                        selectinload(Device.diagnostics),
                        selectinload(Device.category)))
                device_record = session.exec(statement).first()
                if device_record is None:
                    raise HTTPException(status_code=404, detail="Device not found")
                return device_record      
        except Exception:
            raise

    @staticmethod
    def search_devices(name: str= None, vendor_id: int = None, category_id: int = None):
        conditions = []
        if vendor_id is not None:
          conditions.append(Device.vendor_id == vendor_id)
        if category_id is not None:
            conditions.append(Device.category_id == category_id)
        if name:
            conditions.append(Device.name.ilike(f"%{name}%"))
        try:
            with Session(engine) as session:
                statement = (
                    select(Device)
                    .where(*conditions)
                    .options(
                        selectinload(Device.diagnostics),
                        selectinload(Device.category)))
                device_record = session.exec(statement).all()
                if device_record is None:
                    raise HTTPException(status_code=404, detail="Device not found")
                return device_record      
        except Exception:
          raise
        

    
