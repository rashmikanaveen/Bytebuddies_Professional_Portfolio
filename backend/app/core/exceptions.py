from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError


async def integrity_error_handler(request: Request, exc: IntegrityError):
    detail = "Database constraint violation"

    orig = getattr(exc, "orig", None)
    message = str(orig).lower() if orig is not None else str(exc).lower()

    if "foreignkeyviolation" in message or "violates foreign key constraint" in message:
        detail = "Referenced record does not exist"
    elif "unique violation" in message or "duplicate key" in message:
        detail = "Duplicate record already exists"

    return JSONResponse(status_code=409, content={"detail": detail})