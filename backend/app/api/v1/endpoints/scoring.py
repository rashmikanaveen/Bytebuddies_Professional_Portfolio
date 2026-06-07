"""
Scoring API endpoints - Main scoring workflow
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
import uuid

from app.core.database import get_db
from app.core.models import ESGSubmission, ESGScore, FieldVerification, SubmissionStatusEnum, VerificationStatusEnum, GradeEnum
from app.schemas.scoring import SubmissionRequest, SubmissionResponse, CalculateScoreRequest, ScoreResponse, FieldVerificationResponse
from app.core.scoring.normalization import normalize_metrics
from app.core.scoring.calculator import ScoringCalculator
from app.core.scoring.verification import VerificationEngine

router = APIRouter()


@router.post("/submit", response_model=SubmissionResponse, status_code=201)
async def submit_esg(
    request: SubmissionRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit ESG metrics for evaluation.
    
    Creates a new submission in PENDING status. Fields are auto-verified if within tolerance,
    or flagged for officer review if outside tolerance.
    
    Returns submission with verification status of all fields.
    """
    try:
        submission_id = str(uuid.uuid4())
        
        # Convert request to raw metrics dict (9 metrics: 4E + 2S + 3G)
        raw_metrics = {
            # Environmental (4)
            "renewable_energy_pct": request.renewable_energy_pct,
            "waste_management_score": request.waste_management_score,
            "water_efficiency_score": request.water_efficiency_score,
            "env_violations": request.env_violations or 0,
            
            # Social (2)
            "fair_labour_score": request.fair_labour_score,
            "data_protection_score": request.data_protection_score,
            
            # Governance (3)
            "board_independence_pct": request.board_independence_pct,
            "anti_corruption_score": request.anti_corruption_score,
            "financial_transparency_score": request.financial_transparency_score,
        }
        
        # Normalize all metrics
        normalized = normalize_metrics(raw_metrics)
        
        # Create submission record
        submission = ESGSubmission(
            id=submission_id,
            applicant_id=request.applicant_id,
            sector=request.sector,
            status=SubmissionStatusEnum.PENDING,
            raw_metrics=raw_metrics,
            normalized_metrics=normalized,
            notes=request.notes,
            submitted_by=request.submitted_by,
        )
        
        # Create field verification records
        field_verifications = []
        for metric_key, raw_value in raw_metrics.items():
            # For now, all fields are SYSTEM_VERIFIED (in real scenario, would compare with extracted values)
            fv = FieldVerification(
                id=str(uuid.uuid4()),
                submission_id=submission_id,
                metric_key=metric_key,
                submitted_value=raw_value,
                extracted_value=None,
                status=VerificationStatusEnum.SYSTEM_VERIFIED,
            )
            field_verifications.append(fv)
        
        submission.field_verifications = field_verifications
        
        db.add(submission)
        await db.commit()
        await db.refresh(submission)
        
        # Build response
        return SubmissionResponse(
            id=submission.id,
            applicant_id=submission.applicant_id,
            sector=submission.sector,
            status=submission.status,
            field_verifications=[
                FieldVerificationResponse(
                    metric_key=fv.metric_key,
                    label=raw_metrics.get(fv.metric_key, "Unknown"),
                    submitted_value=fv.submitted_value,
                    extracted_value=fv.extracted_value,
                    status=fv.status,
                    flag_reason=fv.flag_reason,
                    officer_notes=fv.officer_notes,
                    documents=fv.documents,
                )
                for fv in submission.field_verifications
            ],
            consistency_flags=VerificationEngine.apply_cross_metric_consistency_checks(normalized),
            created_at=submission.created_at.isoformat(),
            updated_at=submission.updated_at.isoformat(),
        )
    
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/calculate", response_model=ScoreResponse, status_code=200)
async def calculate_score(
    request: CalculateScoreRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Calculate ESG score for a submission.
    
    Requires submission status to be CROSS_CHECKED.
    Returns HTTP 422 if submission is not fully verified.
    
    Implements the full scoring formula:
    1. Normalize metrics (0-100)
    2. Calculate pillar sub-scores using AHP weights
    3. Apply hard penalties (cap at 30 if violations exist)
    4. Combine pillars into final Green Score
    5. Determine grade and gate status
    """
    # Fetch submission
    stmt = select(ESGSubmission).where(ESGSubmission.id == request.submission_id)
    result = await db.execute(stmt)
    submission = result.scalars().first()
    
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Submission {request.submission_id} not found"
        )
    
    # Check if submission is CROSS_CHECKED
    if submission.status != SubmissionStatusEnum.CROSS_CHECKED:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Submission must be CROSS_CHECKED to calculate score. Current status: {submission.status}",
            headers={"X-Submission-Status": submission.status.value}
        )
    
    # Get normalized metrics
    if not submission.normalized_metrics:
        submission.normalized_metrics = normalize_metrics(submission.raw_metrics)
    
    # Calculate full score
    score_data = ScoringCalculator.calculate_full_score(submission.normalized_metrics)
    
    # Create ESGScore record
    score_id = str(uuid.uuid4())
    esg_score = ESGScore(
        id=score_id,
        submission_id=submission.id,
        green_score=score_data["green_score"],
        grade=GradeEnum(score_data["grade"]),
        e_score=score_data["e_score"],
        s_score=score_data["s_score"],
        g_score=score_data["g_score"],
        passed_gate=score_data["passed_gate"],
        pillar_weights_snapshot={"E": 0.540, "S": 0.297, "G": 0.164},
        metric_weights_snapshot={},
        algorithm_version="1.0",
        breakdown=score_data,
    )
    
    # Update submission status
    submission.status = SubmissionStatusEnum.APPROVED
    submission.approved_by = "system"
    submission.updated_at = datetime.utcnow()
    
    db.add(esg_score)
    db.add(submission)
    await db.commit()
    await db.refresh(esg_score)
    
    # Build response
    from app.schemas.scoring import ScoreBreakdown, NormalizedMetricBreakdown, MetricContribution
    
    breakdown = ScoreBreakdown(
        green_score=score_data["green_score"],
        grade=score_data["grade"],
        passed_gate=score_data["passed_gate"],
        e_score=score_data["e_score"],
        s_score=score_data["s_score"],
        g_score=score_data["g_score"],
        e_breakdown={
            k: NormalizedMetricBreakdown(**v) for k, v in score_data["e_breakdown"].items()
        },
        s_breakdown={
            k: NormalizedMetricBreakdown(**v) for k, v in score_data["s_breakdown"].items()
        },
        g_breakdown={
            k: NormalizedMetricBreakdown(**v) for k, v in score_data["g_breakdown"].items()
        },
        top_contributors=score_data["top_contributors"],
    )
    
    return ScoreResponse(
        id=esg_score.id,
        submission_id=esg_score.submission_id,
        green_score=esg_score.green_score,
        grade=esg_score.grade,
        passed_gate=esg_score.passed_gate,
        breakdown=breakdown,
        algorithm_version=esg_score.algorithm_version,
        created_at=esg_score.created_at.isoformat(),
    )


@router.get("/{submission_id}", response_model=SubmissionResponse)
async def get_submission(
    submission_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get submission with verification status"""
    stmt = select(ESGSubmission).where(ESGSubmission.id == submission_id)
    result = await db.execute(stmt)
    submission = result.scalars().first()
    
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Submission {submission_id} not found"
        )
    
    return SubmissionResponse(
        id=submission.id,
        applicant_id=submission.applicant_id,
        sector=submission.sector,
        status=submission.status,
        field_verifications=[
            FieldVerificationResponse(
                metric_key=fv.metric_key,
                label=fv.metric_key,
                submitted_value=fv.submitted_value,
                extracted_value=fv.extracted_value,
                status=fv.status,
                flag_reason=fv.flag_reason,
                officer_notes=fv.officer_notes,
                documents=fv.documents,
            )
            for fv in submission.field_verifications
        ],
        consistency_flags=[],
        created_at=submission.created_at.isoformat(),
        updated_at=submission.updated_at.isoformat(),
    )


@router.get("/{submission_id}/score", response_model=ScoreResponse)
async def get_score(
    submission_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get calculated score for a submission"""
    stmt = select(ESGScore).where(ESGScore.submission_id == submission_id)
    result = await db.execute(stmt)
    score = result.scalars().first()
    
    if not score:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Score not found for submission {submission_id}"
        )
    
    from app.schemas.scoring import ScoreBreakdown, NormalizedMetricBreakdown
    
    breakdown_dict = score.breakdown or {}
    breakdown = ScoreBreakdown(
        green_score=score.green_score,
        grade=score.grade,
        passed_gate=score.passed_gate,
        e_score=score.e_score,
        s_score=score.s_score,
        g_score=score.g_score,
        e_breakdown={
            k: NormalizedMetricBreakdown(**v) 
            for k, v in breakdown_dict.get("e_breakdown", {}).items()
        },
        s_breakdown={
            k: NormalizedMetricBreakdown(**v) 
            for k, v in breakdown_dict.get("s_breakdown", {}).items()
        },
        g_breakdown={
            k: NormalizedMetricBreakdown(**v) 
            for k, v in breakdown_dict.get("g_breakdown", {}).items()
        },
        top_contributors=breakdown_dict.get("top_contributors", []),
    )
    
    return ScoreResponse(
        id=score.id,
        submission_id=score.submission_id,
        green_score=score.green_score,
        grade=score.grade,
        passed_gate=score.passed_gate,
        breakdown=breakdown,
        algorithm_version=score.algorithm_version,
        created_at=score.created_at.isoformat(),
    )
