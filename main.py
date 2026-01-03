from fastapi import FastAPI, Depends
import database
from models import habit
from database import session
import database_model
from sqlalchemy.orm import Session
app = FastAPI()

database_model.Base.metadata.create_all(bind=database.engine)

habits = [
    habit(id=1, name="LeetCode", boolean=True, description="Started watching 70 LC prob vid"),
    habit(id=2, name="Project Work", boolean=True, description="started with mvp of \"did-i-do-it\" app")
]

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

def init_db():
    db = session()
    count = db.query(database_model.habit).count()

    if count == 0:

        for h in habits:
            db.add(database_model.habit(**h.model_dump()))
        db.commit()

init_db()



@app.get("/")
async def read_root():
    return {"Hello": "World!"}

# @app.post("/items")
# def create_item(item: str):
#     items.append(item)
#     return items

@app.get("/habits")
def get_habits(db: Session = Depends(get_db)):
    db_habits = db.query(database_model.habit).all()
    # db connection
    # db = session()
    # query
    # db.query()
    return db_habits

@app.get("/habits/{id}")
def get_habit_by_id(id: int, db: Session = Depends(get_db)):
    db_habits = db.query(database_model.habit).filter(database_model.habit.id == id).first()
    # for h in habits:
    #     if h.id == id:
    #         return h
    # return "not found"
    if db_habits:
        return db_habits
    return "not found"


@app.post("/habits")
def create_habit(new_habit: habit, db: Session = Depends(get_db)):
    db.add(database_model.habit(**new_habit.model_dump()))
    db.commit()
    return new_habit

@app.put("/habits/{id}")
def update_habit(id: int, updated_habit: habit, db: Session = Depends(get_db)):
    db_habit = db.query(database_model.habit).filter(database_model.habit.id == id).first() 
    # check if the habit exists
    if db_habit:
        db.query(database_model.habit).filter(database_model.habit.id == id).update(updated_habit.model_dump())
        db.commit()
        return updated_habit
    return "not found"

@app.delete("/habits/{id}")
def delete_habit(id: int, db: Session = Depends(get_db)):
    db_habit = db.query(database_model.habit).filter(database_model.habit.id == id).first()
    if db_habit:
        db.delete(db_habit)
        db.commit()
        return "deleted"
    return "not found"
