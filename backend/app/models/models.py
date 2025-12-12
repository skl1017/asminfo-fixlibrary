from typing import Optional
from sqlmodel import SQLModel
from app.orm.models import Component, Diagnostic, Device, Category

class CategoryBase(SQLModel):
    name: str

class CreateCategory(CategoryBase):
    pass

class  ReadCategory(CategoryBase):
    id: int
    devices: list = []

class CreateDevice(SQLModel):
    name: str
    serial_code: Optional[str] = None
    category_id: int
    vendor_id: Optional[int] = None

class ReadDevice(CreateDevice):
    id: int
    components: list = []
    diagnostics: list = []
    category: Category

class CreateComponent(SQLModel):
    name: str
    serial_code: str

class CreateDeviceComponentLink(SQLModel):
    component_id: int

class CreateDiagnostic(SQLModel):
    device_id: int
    title: str
    description: str

class ReadDiagnostic(CreateDiagnostic):
    device: Optional[Device]
    issues: list = []

class CreateIssue(SQLModel):
    diagnostic_id: int
    component_id: Optional[int] = None
    title: str
    description: str

class ReadIssue(CreateIssue):
    component: Optional[Component]
    diagnostic: Optional[Diagnostic]
    solutions: list = []

class CreateSolution(SQLModel):
    title: str
    description: str
    issue_id: int

class CreateVendor(SQLModel):
    name: str