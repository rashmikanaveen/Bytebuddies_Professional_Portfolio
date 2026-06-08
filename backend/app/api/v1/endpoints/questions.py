from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.api.v1.database import get_async_db
from app.api.v1.models import Question
from app.schemas.question_schema import QuestionCreate, QuestionOut

router = APIRouter(prefix="/questions", tags=["Questions"])


@router.get("/", response_model=List[QuestionOut])
async def get_questions(
    category: str | None = None,
    db: AsyncSession = Depends(get_async_db)
):
    query = select(Question)
    if category:
        query = query.where(Question.category == category.upper())
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{question_id}", response_model=QuestionOut)
async def get_question(
    question_id: int,
    db: AsyncSession = Depends(get_async_db)
):
    result = await db.execute(
        select(Question).where(Question.question_id == question_id)
    )
    q = result.scalars().first()
    if not q:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    return q


@router.post("/", response_model=QuestionOut, status_code=status.HTTP_201_CREATED)
async def create_question(
    payload: QuestionCreate,
    db: AsyncSession = Depends(get_async_db)
):
    question = Question(**payload.model_dump())
    db.add(question)
    await db.commit()
    await db.refresh(question)
    return question