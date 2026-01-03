# to do configure database connection using sqlalchemy and postgresql

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

db_url = "postgresql://postgres:12345678*&@localhost:5432/did_i_do_it"
engine = create_engine(db_url)
session  = sessionmaker(autocommit=False, autoflush=False, bind=engine)