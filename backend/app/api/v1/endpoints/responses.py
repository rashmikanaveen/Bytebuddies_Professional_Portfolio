from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.database import get_async_db
from app.api.v1.models import Response
from app.schemas.responses import ResponseBulkSubmit

router = APIRouter(prefix="/responses", tags=["Responses"])

@router.post("/")
async def submit_response(data: ResponseBulkSubmit, db: AsyncSession = Depends(get_async_db)):
    # Save the full questionnaire in one request and one commit.
    new_responses = [
        Response(
            application_id=data.application_id,
            question_id=resp.question_id,
            answer_value=resp.answer_value,
            requires_document=resp.requires_document,
            score=0.0,
        )
        for resp in data.responses
    ]

    db.add_all(new_responses)
    
    await db.commit()
    return {"msg": "responses saved successfully", "count": len(new_responses)}

@router.get("/{application_id}")
async def get_responses(application_id: int, db: AsyncSession = Depends(get_async_db)):
    result = await db.execute(select(Response).where(Response.application_id == application_id))
    responses = result.scalars().all()
    return {
        "application_id": application_id,
        "responses": [
            {
                "question_id": r.question_id,
                "answer_value": r.answer_value,
                "score": r.score,
                "requires_document": r.requires_document,
            }
            for r in responses
        ]
    }