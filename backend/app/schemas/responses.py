from pydantic import BaseModel, conlist


class ResponseSubmit(BaseModel):
    question_id: int
    answer_value: str
    requires_document: str | None = None


class ResponseBulkSubmit(BaseModel):
    application_id: int
    responses: conlist(ResponseSubmit, min_length=9, max_length=9)