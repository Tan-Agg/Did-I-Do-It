
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean

Base = declarative_base()


class habit(Base):

    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    boolean = Column(Boolean)
    description = Column(String)