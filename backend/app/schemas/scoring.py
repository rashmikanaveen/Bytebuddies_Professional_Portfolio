"""
Pydantic schemas for API requests and responses
"""
from pydantic import BaseModel, Field, validator
from typing import Dict, List, Optional, Any
from enum import Enum


class VerificationStatusEnum(str, Enum):
    SYSTEM_VERIFIED = "SYSTEM_VERIFIED"
    FLAGGED_FOR_OFFICER = "FLAGGED_FOR_OFFICER"
    OFFICER_VERIFIED = "OFFICER_VERIFIED"
    OFFICER_REJECTED = "OFFICER_REJECTED"


class SubmissionStatusEnum(str, Enum):
    PENDING = "PENDING"
    CROSS_CHECKED = "CROSS_CHECKED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class GradeEnum(str, Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"


class SubmissionRequest(BaseModel):
    """ESG submission with 9 metrics (4 environmental + 2 social + 3 governance)"""
    
    applicant_id: str = Field(..., description="Unique applicant ID")
    sector: str = Field(default="DEFAULT", description="Business sector")
    
    # Environmental metrics (4)
    renewable_energy_pct: Optional[float] = Field(None, ge=0, le=100, description="% renewable energy")
    waste_management_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    water_efficiency_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    env_violations: Optional[int] = Field(None, ge=0, description="Count in last 3 years")
    
    # Social metrics (2)
    fair_labour_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    data_protection_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    
    # Governance metrics (3)
    board_independence_pct: Optional[float] = Field(None, ge=0, le=100, description="% independent directors")
    anti_corruption_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    financial_transparency_score: Optional[float] = Field(None, ge=0, le=5, description="Score 0-5")
    
    notes: Optional[str] = Field(None, description="Submission notes")
    submitted_by: Optional[str] = Field(None, description="Officer ID")
    
    @validator("env_violations", pre=True, always=True)
    def int_or_none(cls, v):
        if v is None:
            return 0
        return int(v)


class CalculateScoreRequest(BaseModel):
    """Request to calculate score (requires submission to be CROSS_CHECKED)"""
    submission_id: str = Field(..., description="ID of submission to score")


class FieldVerificationRequest(BaseModel):
    """Officer verification of a flagged field"""
    submission_id: str
    metric_key: str
    status: VerificationStatusEnum
    officer_notes: Optional[str] = None
    officer_id: str


# ============================================================================
# RESPONSE SCHEMAS
# ============================================================================

class FieldVerificationResponse(BaseModel):
    """Verification status of a single field"""
    metric_key: str
    label: str
    submitted_value: Optional[float]
    extracted_value: Optional[float]
    status: VerificationStatusEnum
    flag_reason: Optional[str]
    officer_notes: Optional[str]
    documents: Optional[List[str]]


class NormalizedMetricBreakdown(BaseModel):
    """Breakdown of a single metric contribution"""
    normalized_value: float = Field(..., description="Value normalized to 0-100")
    weight: float = Field(..., description="AHP-derived weight")
    contribution: float = Field(..., description="normalized_value * weight")
    label: str = Field(..., description="Metric label")


class PillarBreakdown(BaseModel):
    """Breakdown for a pillar (E, S, or G)"""
    metrics: Dict[str, NormalizedMetricBreakdown]


class MetricContribution(BaseModel):
    """Top contributing metric"""
    metric: str
    contribution: float


class ScoreBreakdown(BaseModel):
    """Full score breakdown"""
    green_score: float = Field(..., ge=0, le=100, description="Final 0-100 score")
    grade: GradeEnum
    passed_gate: bool = Field(..., description="True if ≥ 40")
    e_score: float = Field(..., ge=0, le=100, description="Environmental sub-score")
    s_score: float = Field(..., ge=0, le=100, description="Social sub-score")
    g_score: float = Field(..., ge=0, le=100, description="Governance sub-score")
    e_breakdown: Dict[str, NormalizedMetricBreakdown]
    s_breakdown: Dict[str, NormalizedMetricBreakdown]
    g_breakdown: Dict[str, NormalizedMetricBreakdown]
    top_contributors: List[MetricContribution]


class SubmissionResponse(BaseModel):
    """Complete submission with verification status"""
    id: str
    applicant_id: str
    sector: str
    status: SubmissionStatusEnum
    field_verifications: List[FieldVerificationResponse]
    consistency_flags: List[Dict[str, str]] = []
    created_at: str
    updated_at: str


class ScoreResponse(BaseModel):
    """Final score response"""
    id: str
    submission_id: str
    green_score: float
    grade: GradeEnum
    passed_gate: bool
    breakdown: ScoreBreakdown
    algorithm_version: str = "1.0"
    created_at: str


class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    details: Optional[Dict[str, Any]] = None
    submission_status: Optional[str] = None
    required_action: Optional[str] = None


class AHPMatrixRequest(BaseModel):
    """Update AHP weight matrix"""
    sector: str = Field("DEFAULT")
    matrix_level: str = Field(..., description="PILLAR, ENVIRONMENTAL, SOCIAL, or GOVERNANCE")
    comparison_matrix: List[List[float]] = Field(..., description="NxN pairwise comparison matrix")


class AHPMatrixResponse(BaseModel):
    """AHP matrix with derived weights"""
    id: str
    sector: str
    matrix_level: str
    comparison_matrix: List[List[float]]
    weights: Dict[str, float]
    consistency_ratio: float
    algorithm_version: str
    created_at: str
    updated_at: str
