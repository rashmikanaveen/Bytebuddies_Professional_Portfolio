from pydantic import BaseModel, Field
from typing import Optional


class QuestionCreate(BaseModel):
    question_text: str = Field(..., description="The question shown to the applicant")
    category: str = Field(..., description="ESG pillar: E, S, or G")
    weight: float = Field(default=1.0, description="Scoring weight for this question")

    class Config:
        json_schema_extra = {
            "example": {
                "question_text": "What percentage of your energy comes from renewable sources?",
                "category": "E",
                "weight": 1.0
            }
        }


class QuestionOut(BaseModel):
    question_id: int
    question_text: str
    category: str
    weight: float

    class Config:
        from_attributes = True