from app.models.models import CreateVendor
from app.orm.models import Vendor
from app.core.config import engine
from sqlmodel import Session, select
from fastapi import HTTPException
from sqlalchemy.orm import selectinload

class VendorService():
    
    @staticmethod
    def get_vendor_list():
        try:
            with Session(engine) as session:
                statement = select(Vendor)
                categories = session.exec(statement).all()
                return categories      
        except Exception:
            raise
    
    @staticmethod
    def create_vendor(create_vendor: CreateVendor):
        vendor_record = Vendor(
        name=create_vendor.name)
        try: 
            with Session(engine) as session:
                session.add(vendor_record)
                session.commit()
                session.refresh(vendor_record)
                return vendor_record
        except Exception:
            raise