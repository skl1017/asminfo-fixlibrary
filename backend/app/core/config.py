from dotenv import load_dotenv
from os import getenv
from sqlmodel import create_engine, SQLModel, Session, select
from pathlib import Path
from app.orm.models import Category, Vendor
from app.utils.seed_elements import seed_elements

load_dotenv()

db_host = getenv("POSTGRES_HOST", "localhost")
db_url = getenv(
    "DATABASE_URL",
    f"postgresql+psycopg2://asminfo_user:asminfo_password@{db_host}:5432/asminfo"
)


engine = create_engine(db_url, echo=True)
SQLModel.metadata.create_all(engine)

all_tables = SQLModel.metadata.tables

print("Current tables :")
for table_name in all_tables.keys():
    print(f"- {table_name}")


base_dir = Path(__file__).resolve().parent.parent.parent.parent
categories_file = base_dir / "categories.txt"
vendors_file = base_dir / "fabricants.txt"

seed_elements(engine, categories_file, Category)
seed_elements(engine, vendors_file, Vendor)
