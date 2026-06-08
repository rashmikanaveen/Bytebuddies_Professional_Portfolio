from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, JSON, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.core.database import Base


class VerificationStatusEnum(str, enum.Enum):
    SYSTEM_VERIFIED = "SYSTEM_VERIFIED"
    FLAGGED_FOR_OFFICER = "FLAGGED_FOR_OFFICER"
    OFFICER_VERIFIED = "OFFICER_VERIFIED"
    OFFICER_REJECTED = "OFFICER_REJECTED"


class SubmissionStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    CROSS_CHECKED = "CROSS_CHECKED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class GradeEnum(str, enum.Enum):
    A = "A"  # 75–100
    B = "B"  # 60–74
    C = "C"  # 40–59
    D = "D"  # 0–39


# ============================================================================
# AHP Matrices — Store pairwise comparison matrices for deriving weights
# ============================================================================

class AHPMatrix(Base):
    __tablename__ = "ahp_matrices"
    
    id = Column(String(50), primary_key=True)
    sector = Column(String(50), index=True)  # e.g., "DEFAULT", "MANUFACTURING", "SERVICES"
    matrix_level = Column(String(50))  # e.g., "PILLAR", "ENVIRONMENTAL", "SOCIAL", "GOVERNANCE"
    
    # The pairwise comparison matrix as JSON (NxN)
    comparison_matrix = Column(JSON)
    
    # Derived weights (after normalization)
    weights = Column(JSON)
    
    # Consistency Ratio — must be ≤ 0.10
    consistency_ratio = Column(Float)
    
    # Algorithm version for audit trail
    algorithm_version = Column(String(20), default="1.0")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# Metric Registry — All 14 ESG metrics with min/max ranges
# ============================================================================

class MetricRegistry(Base):
    __tablename__ = "metric_registry"
    
    id = Column(String(50), primary_key=True)
    key = Column(String(50), unique=True, index=True)  # e.g., "carbon_intensity"
    label = Column(String(255))
    pillar = Column(String(10))  # E, S, or G
    direction = Column(String(20))  # "higher_is_better" or "lower_is_better"
    
    # Normalization range
    min_val = Column(Float)
    max_val = Column(Float)
    
    # Hard penalty flag (only env_violations and regulatory_violations have this)
    hard_penalty = Column(Boolean, default=False)
    
    # Tolerance for verification (JSON: {"type": "percentage", "value": 2})
    tolerance = Column(JSON)
    
    unit = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# ESG Submissions — Applicant submissions with verification status
# ============================================================================

class ESGSubmission(Base):
    __tablename__ = "esg_submissions"
    
    id = Column(String(50), primary_key=True)
    applicant_id = Column(String(50), index=True)
    sector = Column(String(50), default="DEFAULT")
    
    # Submission status
    status = Column(SQLEnum(SubmissionStatusEnum), default=SubmissionStatusEnum.PENDING, index=True)
    
    # Raw submitted values (as JSON)
    raw_metrics = Column(JSON)
    
    # Normalized values (0-100)
    normalized_metrics = Column(JSON, nullable=True)
    
    # Field-level verification status (stores FieldVerification records)
    field_verifications = relationship("FieldVerification", back_populates="submission", cascade="all, delete-orphan")
    
    # The calculated score (if status = APPROVED)
    esg_scores = relationship("ESGScore", back_populates="submission", uselist=False, cascade="all, delete-orphan")
    
    # Audit trail
    audit_logs = relationship("AuditLog", back_populates="submission", cascade="all, delete-orphan")
    
    # Metadata
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    submitted_by = Column(String(50), nullable=True)
    approved_by = Column(String(50), nullable=True)


# ============================================================================
# Field Verification — Per-field verification status
# ============================================================================

class FieldVerification(Base):
    __tablename__ = "field_verification"
    
    id = Column(String(50), primary_key=True)
    submission_id = Column(String(50), ForeignKey("esg_submissions.id"), index=True)
    submission = relationship("ESGSubmission", back_populates="field_verifications")
    
    metric_key = Column(String(50), index=True)  # e.g., "carbon_intensity"
    
    # Submitted value
    submitted_value = Column(Float, nullable=True)
    
    # Extracted value from document (if available)
    extracted_value = Column(Float, nullable=True)
    
    # Verification status
    status = Column(SQLEnum(VerificationStatusEnum), default=VerificationStatusEnum.SYSTEM_VERIFIED, index=True)
    
    # Evidence documents uploaded
    documents = Column(JSON, nullable=True)  # List of document IDs/paths
    
    # Officer notes (if FLAGGED_FOR_OFFICER)
    flag_reason = Column(Text, nullable=True)
    officer_notes = Column(Text, nullable=True)
    officer_id = Column(String(50), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# ESG Scores — Calculated scores with full breakdown
# ============================================================================

class ESGScore(Base):
    __tablename__ = "esg_scores"
    
    id = Column(String(50), primary_key=True)
    submission_id = Column(String(50), ForeignKey("esg_submissions.id"), unique=True)
    submission = relationship("ESGSubmission", back_populates="esg_scores")
    
    # Final score and grade
    green_score = Column(Float)
    grade = Column(SQLEnum(GradeEnum))
    
    # Sub-scores
    e_score = Column(Float)
    s_score = Column(Float)
    g_score = Column(Float)
    
    # Passed/blocked at gate
    passed_gate = Column(Boolean)  # True if score >= 40
    
    # Snapshot of weights used (for audit trail)
    pillar_weights_snapshot = Column(JSON)  # {"E": 0.54, "S": 0.297, "G": 0.164}
    metric_weights_snapshot = Column(JSON)  # Full nested weights used
    
    # Algorithm version
    algorithm_version = Column(String(20), default="1.0")
    
    # Full breakdown (normalized scores + contributions)
    breakdown = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# Audit Log — Track all changes for compliance
# ============================================================================

class AuditLog(Base):
    __tablename__ = "audit_log"
    
    id = Column(String(50), primary_key=True)
    submission_id = Column(String(50), ForeignKey("esg_submissions.id"), index=True)
    submission = relationship("ESGSubmission", back_populates="audit_logs")
    
    action = Column(String(50))  # e.g., "SUBMITTED", "FLAGGED", "VERIFIED", "SCORED"
    actor = Column(String(50))
    details = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
