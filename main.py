from fastapi import FastAPI
from models import habit

app = FastAPI()

habits = [
    habit(id=1, name="LeetCode", boolean=True, description="Started watching 70 LC prob vid"),
    habit(id=2, name="Project Work", boolean=True, description="started with mvp of \"did-i-do-it\" app")
]

@app.get("/")
async def read_root():
    return {"Hello": "World!"}

# @app.post("/items")
# def create_item(item: str):
#     items.append(item)
#     return items

@app.get("/habits")
def get_habits():
    return habits

@app.get("/habits/{id}")
def get_habit_by_id(id: int):
    for h in habits:
        if h.id == id:
            return h
    return "not found"


@app.post("/habits")
def create_habit(new_habit: habit):
    habits.append(new_habit)
    return new_habit

@app.put("/habits/{id}")
def update_habit(id: int, updated_habit: habit):
    for i in range(len(habits)):
        if habits[i].id == id:
            habits[i] = updated_habit
            return updated_habit
    return "not found"

@app.delete("/habits/{id}")
def delete_habit(id: int):
    for i in range(len(habits)):
        if habits[i].id == id:
            del habits[i]
            return "deleted"
    return "not found" 
