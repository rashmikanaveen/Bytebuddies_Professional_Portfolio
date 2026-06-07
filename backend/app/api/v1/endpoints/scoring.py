from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.v1.database import SessionLocal
from app.api.v1.models import FinalScore, Application

router = APIRouter(prefix="/score", tags=["Scoring"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/calculate/{application_id}")
def calculate_score(application_id: int, db: Session = Depends(get_db)):
    app_record = db.query(Application).filter(Application.application_id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
        
    # Ensure manual review or automated check has concluded before scoring
    if app_record.status not in ["SYSTEM_VERIFIED", "OFFICER_VERIFIED"]:
        raise HTTPException(status_code=400, detail=f"Cannot score application with status: {app_record.status}. Verification required.")

    # Step 6: Decision engine calculates ESG + credit score
    # Replace mock logic with the actual AHP values from Nipun's future engine logic
    esg_calc = 80.0
    credit_calc = 75.0
    verification_calc = 85.0

    final_calc = (0.4 * esg_calc) + (0.4 * credit_calc) + (0.2 * verification_calc)

    # Step 8: Final score + loan decision
    final_decision = "APPROVED" if final_calc >= 70 else "REJECTED"
    
    score_record = FinalScore(
        application_id=application_id,
        esg_score=esg_calc,
        credit_score=credit_calc,
        verification_score=verification_calc,
        final_score=final_calc,
        decision=final_decision,
        cutoff_threshold=70.0
    )
    db.add(score_record)
    
    app_record.status = final_decision
    db.commit()
    db.refresh(score_record)

    return {
        "application_id": application_id,
        "score_id": score_record.score_id,
        "esg_score": score_record.esg_score,
        "final_score": score_record.final_score,
        "decision": score_record.decision
    }