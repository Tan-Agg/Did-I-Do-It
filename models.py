from pydantic import BaseModel

class habit(BaseModel):
    id: int
    name: str
    boolean: bool
    description: str

# do not need contrcutor because BaseModel provides one
# constrcutor
    # def __init__(self, id: int, name: str, boolean: bool, description: str):
    #     self.id = id
    #     self.name = name
    #     self.boolean = boolean
    #     self.description = description