from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.api.v1.database import get_async_db
from app.api.v1.models import Application

router = APIRouter(prefix="/applications", tags=["Applications"])

class ApplicationCreate(BaseModel):
    user_id: int
    business_name: str
    industry: str
    loan_amount: float

@router.post("/")
async def create_application(app_data: ApplicationCreate, db: AsyncSession = Depends(get_async_db)):
    # Step 1a: User starts an ESG + Loan Application
    new_app = Application(
        user_id=app_data.user_id,
        business_name=app_data.business_name,
        industry=app_data.industry,
        loan_amount=app_data.loan_amount,
        status="SUBMITTED"
    )
    db.add(new_app)
    await db.commit()
    await db.refresh(new_app)
    return {"msg": "application created", "application_id": new_app.application_id}

@router.get("/{application_id}")
async def get_application(application_id: int, db: AsyncSession = Depends(get_async_db)):
    app_record = await db.scalar(select(Application).where(Application.application_id == application_id))
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {
        "application_id": app_record.application_id,
        "business_name": app_record.business_name,
        "status": app_record.status,
        "loan_amount": app_record.loan_amount
    }