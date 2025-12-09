from sqlmodel import SQLModel, Relationship, Field
from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship

class DeviceComponentLink(SQLModel, table=True):
    __tablename__ = "device_component"
    device_id: int = Field(primary_key=True, foreign_key="device.id")
    component_id: int = Field(primary_key=True, foreign_key="component.id")


class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=255)
    devices: List["Device"] = Relationship(back_populates="category")

class Vendor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=255)
    devices: List["Device"] = Relationship( back_populates="vendor")



class Component(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    serial_code: Optional[str] = Field(default=None, index=True, max_length=255)
    name: str = Field(max_length=255)
    devices: List["Device"] = Relationship(link_model=DeviceComponentLink, back_populates="components")
    issues: List["Issue"] = Relationship(back_populates="component")


class Device(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    serial_code: Optional[str] = Field(default=None, index=True, max_length=255)
    name: str = Field(max_length=255)
    category_id: int = Field(foreign_key="category.id")
    category: Optional[Category] = Relationship(back_populates="devices")
    vendor_id: Optional[int] = Field(foreign_key="vendor.id")
    vendor: Optional[Vendor] = Relationship(back_populates="devices")
    components: List[Component] = Relationship(link_model=DeviceComponentLink, back_populates="devices")
    diagnostics: List["Diagnostic"] = Relationship(back_populates="device")


class Diagnostic(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None, max_length=255)
    device_id: int = Field(foreign_key="device.id")
    device: Optional[Device] = Relationship(back_populates="diagnostics")
    issues: List["Issue"] = Relationship(back_populates="diagnostic")


class Issue(SQLModel, table=True):

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None, max_length=255)
    diagnostic_id: int = Field(foreign_key="diagnostic.id")
    component_id: Optional[int] = Field(default=None, foreign_key="component.id")
    diagnostic: Optional[Diagnostic] = Relationship(back_populates="issues")
    component: Optional[Component] = Relationship(back_populates="issues")
    solutions: List["Solution"] = Relationship(back_populates="issue")


class Solution(SQLModel, table=True):

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None, max_length=255)
    issue_id: int = Field(foreign_key="issue.id")
    issue: Optional[Issue] = Relationship(back_populates="solutions")