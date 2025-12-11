from dotenv import load_dotenv
from os import getenv
from sqlmodel import create_engine, SQLModel
from app.orm.models import *

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
