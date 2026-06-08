from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import List
from app.api.v1.database import get_async_db
from app.api.v1.models import Response

router = APIRouter(prefix="/responses", tags=["Responses"])

class ResponseSubmit(BaseModel):
    question_id: int
    answer_value: str

class ResponseBulkSubmit(BaseModel):
    application_id: int
    responses: List[ResponseSubmit]

@router.post("/")
async def submit_response(data: ResponseBulkSubmit, db: AsyncSession = Depends(get_async_db)):
    # Step 1b: User fills ESG Questionnaire
    new_responses = []
    for resp in data.responses:
        new_resp = Response(
            application_id=data.application_id,
            question_id=resp.question_id,
            answer_value=resp.answer_value,
            score=0.0  # Will be calculated during the decision step
        )
        db.add(new_resp)
        new_responses.append(new_resp)
    
    await db.commit()
    return {"msg": "responses saved successfully", "count": len(new_responses)}

@router.get("/{application_id}")
async def get_responses(application_id: int, db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(Response).where(Response.application_id == application_id))
    responses = result.scalars().all()
    return {
        "application_id": application_id,
        "responses": [{"question_id": r.question_id, "answer_value": r.answer_value} for r in responses]
    }