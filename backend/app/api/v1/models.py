from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    Boolean,
    ForeignKey,
    Numeric,
    TIMESTAMP
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.api.v1.database import Base


# =========================
# USERS
# =========================
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(String(20), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    applications = relationship("Application", back_populates="user")


# =========================
# APPLICATIONS
# =========================
class Application(Base):
    __tablename__ = "applications"

    application_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))

    business_name = Column(String(150))
    industry = Column(String(50))
    loan_amount = Column(Numeric)

    status = Column(String(30), default="SUBMITTED")

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="applications")
    responses = relationship("Response", back_populates="application")
    documents = relationship("Document", back_populates="application")
    final_score = relationship(
        "FinalScore",
        back_populates="application",
        uselist=False
    )


# =========================
# QUESTIONS
# =========================
class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)

    question_text = Column(Text, nullable=False)

    category = Column(String(10))
    weight = Column(Float, default=1.0)

    requires_document = Column(Boolean, default=False)

    responses = relationship("Response", back_populates="question")


# =========================
# RESPONSES
# =========================
class Response(Base):
    __tablename__ = "responses"

    response_id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        Integer,
        ForeignKey("applications.application_id")
    )

    question_id = Column(
        Integer,
        ForeignKey("questions.question_id")
    )

    answer_value = Column(Text)

    score = Column(Float, default=0)

    application = relationship(
        "Application",
        back_populates="responses"
    )

    question = relationship(
        "Question",
        back_populates="responses"
    )

    documents = relationship(
        "Document",
        back_populates="response"
    )


# =========================
# DOCUMENTS
# =========================
class Document(Base):
    __tablename__ = "documents"

    document_id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        Integer,
        ForeignKey("applications.application_id")
    )

    response_id = Column(
        Integer,
        ForeignKey("responses.response_id")
    )

    file_url = Column(Text, nullable=False)

    upload_time = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    application = relationship(
        "Application",
        back_populates="documents"
    )

    response = relationship(
        "Response",
        back_populates="documents"
    )


# =========================
# FINAL SCORES
# =========================
class FinalScore(Base):
    __tablename__ = "final_scores"

    score_id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        Integer,
        ForeignKey("applications.application_id"),
        unique=True
    )

    esg_score = Column(Float)
    credit_score = Column(Float)
    verification_score = Column(Float)

    final_score = Column(Float)

    decision = Column(String(20))

    cutoff_threshold = Column(Float, default=70)

    calculated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    application = relationship(
        "Application",
        back_populates="final_score"
    )