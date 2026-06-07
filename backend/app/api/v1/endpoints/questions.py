from fastapi import APIRouter

router = APIRouter(prefix="/questions", tags=["Questions"])

@router.get("/")
def get_questions():
    return [
        {"id": 1, "question": "Do you use green cloud?", "category": "E"}
    ]

@router.post("/")
def create_question():
    return {"msg": "question created"}
