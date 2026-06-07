from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.v1.database import SessionLocal
from app.api.v1.models import Document, Application
import os

router = APIRouter(prefix="/documents", tags=["Documents"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload/{application_id}")
async def upload_document(application_id: int, response_id: int = None, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Step 2: User uploads supporting documents
    os.makedirs("uploads", exist_ok=True)
    file_location = f"uploads/{application_id}_{file.filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    new_doc = Document(
        application_id=application_id,
        response_id=response_id,
        file_url=file_location
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    return {
        "document_id": new_doc.document_id,
        "filename": file.filename,
        "status": "uploaded"
    }

@router.post("/verify/{application_id}")
def verify_documents(application_id: int, db: Session = Depends(get_db)):
    # Steps 3, 4, 5 & 7: Trigger OCR -> LLM Compare -> Confident Check -> Flag for Review if necessary
    app_record = db.query(Application).filter(Application.application_id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")

    # Placeholder mock for real OCR and LLM comparison logic
    mock_llm_confidence_score = 0.85 
    
    if mock_llm_confidence_score < 0.90:
        app_record.status = "FLAGGED_FOR_OFFICER" # Step 7
    else:
        app_record.status = "SYSTEM_VERIFIED"
        
    db.commit()
    return {
        "application_id": application_id,
        "confidence_score": mock_llm_confidence_score,
        "status": app_record.status,
        "message": "Verification completed. Pending Officer Review." if mock_llm_confidence_score < 0.90 else "Auto-verified successfully."
    }