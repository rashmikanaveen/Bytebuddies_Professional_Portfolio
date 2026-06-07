from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.api.v1.database import SessionLocal
from app.api.v1.models import Application

router = APIRouter(prefix="/applications", tags=["Applications"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ApplicationCreate(BaseModel):
    user_id: int
    business_name: str
    industry: str
    loan_amount: float

@router.post("/")
def create_application(app_data: ApplicationCreate, db: Session = Depends(get_db)):
    # Step 1a: User starts an ESG + Loan Application
    new_app = Application(
        user_id=app_data.user_id,
        business_name=app_data.business_name,
        industry=app_data.industry,
        loan_amount=app_data.loan_amount,
        status="SUBMITTED"
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return {"msg": "application created", "application_id": new_app.application_id}

@router.get("/{application_id}")
def get_application(application_id: int, db: Session = Depends(get_db)):
    app_record = db.query(Application).filter(Application.application_id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {
        "application_id": app_record.application_id,
        "business_name": app_record.business_name,
        "status": app_record.status,
        "loan_amount": app_record.loan_amount
    }