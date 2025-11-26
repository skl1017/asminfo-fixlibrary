from sqlmodel import SQLModel, Relationship, Field, List

class ComponentCategoryLink(SQLModel, table=True):
    category_id: int | None = Field(default=None, foreign_key="category.id", primary_key=True)
    component_id: int | None = Field(default=None, foreign_key="component.id", primary_key=True)

class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    components: List["Component"] = Relationship(back_populates="categories", link_model=ComponentCategoryLink)

class Component(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    serial_code: str
    name: str
    categories: List["Category"] = Relationship(back_populates="components", link_model=ComponentCategoryLink)
    issues: List["Issue"] = Relationship(back_populates="component")
    
class Issue(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str | None
    component_id: int | None = Field(default=None, foreign_key="component.id")
    component: "Component" = Relationship(back_populates="issues")