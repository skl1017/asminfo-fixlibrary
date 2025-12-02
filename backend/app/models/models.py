from typing import Optional
from sqlmodel import SQLModel

class Category(SQLModel):
    name: str

class CreateCategory(Category):
    pass

class  ReadCategory(Category):
    id: int
    devices: list = []

class CreateDevice(SQLModel):
    name: str
    serial_code: Optional[str] = None
    category_id: int

class CreateComponent(SQLModel):
    name: str
    serial_code: str