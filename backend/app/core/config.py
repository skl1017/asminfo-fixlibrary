from dotenv import load_dotenv
from os import getenv
from sqlmodel import create_engine, SQLModel
from app.orm.models import *

load_dotenv()

db_name = getenv("POSTGRES_NAME", "asminfo")
db_user = getenv("POSTGRES_USER", "asminfo_user")
db_pass = getenv("POSTGRES_PASSWORD", "asminfo_password")
db_port = getenv("POSTGRES_PORT", "5432")

database_url = f"postgresql+psycopg2://{db_user}:{db_pass}@localhost:{db_port}/{db_name}"
engine = create_engine(database_url, echo=True)
SQLModel.metadata.create_all(engine)

all_tables = SQLModel.metadata.tables

print("Current tables :")
for table_name in all_tables.keys():
    print(f"- {table_name}")
