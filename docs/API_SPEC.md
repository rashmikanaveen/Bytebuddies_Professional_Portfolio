# API Spec (v1)

This contract defines what the frontend expects from backend APIs for current and planned flows.
It mirrors the rough structure in `backend/app/api/v1/endpoints/*` and the main router file.

Base URL:

- `http://<host>/api/v1`

Auth model:

- Current: bearer token from `POST /auth/login`.
- Planned: role claims should include `loan_officer`, `manager`, `admin`, `applicant`.

## Router Structure

Expected endpoint groups under `app/api/v1/endpoints`:

- `health`
- `auth`
- `applications`
- `responses`
- `documents`
- `verification`
- `score`
- `questions`

## health

### Current

- `GET /health`
- Purpose: service liveness check.
- Success `200`:

```json
{
  "status": "ok"
}
```

### Planned

- Add readiness shape if needed:

```json
{
  "status": "ok",
  "version": "string",
  "dependencies": {
    "db": "up|down"
  }
}
```

## auth

### Current

- `POST /auth/register`
- `POST /auth/login`

#### `POST /auth/register`

Request:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "loan_officer|manager|admin|applicant",
  "profileImageUrl": "optional string"
}
```

Success `201`:

```json
{
  "msg": "User registered successfully",
  "user_id": 1,
  "user": {
    "name": "string",
    "email": "string",
    "role": "loan_officer|manager|admin|applicant",
    "profileImageUrl": "optional string"
  }
}
```

#### `POST /auth/login`

Request:

```json
{
  "email": "string",
  "password": "string",
  "role": "loan_officer|manager|admin|applicant"
}
```

Success `200`:

```json
{
  "access_token": "jwt",
  "token_type": "bearer",
  "user": {
    "name": "string",
    "email": "string",
    "role": "loan_officer|manager|admin|applicant",
    "profileImageUrl": "optional string"
  }
}
```

### Planned

- Expand roles to include applicant/officer/manager/admin for UI route guards.
- Add `GET /auth/me` for profile bootstrap:

```json
{
  "name": "string",
  "email": "string",
  "role": "loan_officer|manager|admin|applicant",
  "profileImageUrl": "optional string"
}
```

- Standardize error responses:

```json
{
  "detail": "Invalid credentials"
}
```

## applications

### Current (exists in endpoint file, should be registered in router)

- `POST /applications/`
- `GET /applications/{application_id}`

#### `POST /applications/`

Request:

```json
{
  "user_id": 1,
  "business_name": "string",
  "industry": "string",
  "loan_amount": 25000000
}
```

Success `200`:

```json
{
  "msg": "application created",
  "application_id": 101
}
```

### Planned

- Applicant UI contract uses this shape:

```json
{
  "businessName": "string",
  "loanAmount": 25000000,
  "purpose": "string"
}
```

Success:

```json
{
  "applicationId": "APP-12345",
  "status": "DRAFT|SUBMITTED"
}
```

## responses

### Current (exists in endpoint file, should be registered in router)

- `POST /responses/`
- `GET /responses/{application_id}`

#### `POST /responses/`

Request:

```json
{
  "application_id": 101,
  "responses": [
    {
      "question_id": 1,
      "answer_value": "yes"
    }
  ]
}
```

### Planned

- Normalize payload for question-driven forms:

```json
{
  "applicationId": "APP-12345",
  "responses": [
    {
      "questionId": 1,
      "value": "62"
    }
  ]
}
```

Success:

```json
{
  "applicationId": "APP-12345",
  "saved": 6
}
```

## documents

### Current (exists in endpoint file, should be registered in router)

- `POST /documents/upload/{application_id}`
- `POST /documents/verify/{application_id}`

#### Upload request

- `multipart/form-data`
- Fields:
  - `file`
  - optional `response_id`

Success:

```json
{
  "document_id": 1,
  "filename": "report.pdf",
  "status": "uploaded"
}
```

### Planned

- Add section tagging (`E|S|G|LOAN`) for each uploaded file.
- Add file metadata response with type/size/content hash.

## verification

### Current

- Endpoint module exists but has no routes yet.

### Planned

- `PATCH /verification/submissions/{submission_id}`
- Purpose: officer field-level decisions.
- Request:

```json
{
  "decisions": [
    {
      "field": "renewable_energy_pct",
      "decision": "VERIFIED|REJECTED|CANNOT_VERIFY",
      "note": "optional"
    }
  ]
}
```

## score

### Current (exists in endpoint file, should be registered in router)

- `POST /score/calculate/{application_id}`

Success:

```json
{
  "application_id": 101,
  "score_id": 9,
  "esg_score": 80,
  "final_score": 77,
  "decision": "APPROVED"
}
```

### Planned

- Add breakdown payload used by score result UI:

```json
{
  "score": 78,
  "grade": "B",
  "gateStatus": "PASS",
  "gateReason": "string",
  "pillars": [{ "pillar": "Environmental", "score": 82 }],
  "metricBreakdown": [
    {
      "key": "renewable_energy_pct",
      "label": "Renewable Energy Percentage",
      "pillar": "E",
      "contribution": 12.4
    }
  ]
}
```

## questions

### Current (exists in endpoint file, should be registered in router)

- `GET /questions/`
- `POST /questions/`

Current sample response:

```json
[
  {
    "id": 1,
    "question": "Do you use green cloud?",
    "category": "E"
  }
]
```

### Planned (required for applicant apply form rendering)

Questions should drive dynamic frontend form fields.

#### `GET /questions/`

Success:

```json
[
  {
    "id": 1,
    "key": "business_name",
    "label": "Company Name",
    "category": "LOAN|E|S|G",
    "fieldType": "text|number|textarea|select|boolean",
    "required": true,
    "placeholder": "optional",
    "helpText": "optional",
    "order": 1,
    "options": [{ "label": "optional", "value": "optional" }]
  }
]
```

#### `POST /questions/`

Request:

```json
{
  "key": "board_independence_band",
  "label": "Board Independence Band",
  "category": "G",
  "fieldType": "select",
  "required": true,
  "order": 6,
  "options": [{ "label": "25% - 50%", "value": "25_to_50" }]
}
```

## Planned Endpoints For Frontend Modules

These are not in current backend files yet but are required by current frontend modules:

- `GET /reports`
- `GET /admin/ahp-matrices`
- `PUT /admin/ahp-matrices/{id}`

## Standard Error Response

All endpoints should return this shape on failure:

```json
{
  "detail": "Human readable error"
}
```

## Router Registration Checklist

In `backend/app/api/v1/router.py`, ensure these modules are included:

- `health`
- `auth`
- `application`
- `responses`
- `documents`
- `verification`
- `scoring`
- `questions`

Expected include patterns:

```python
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router)
api_router.include_router(application.router)
api_router.include_router(responses.router)
api_router.include_router(documents.router)
api_router.include_router(verification.router)
api_router.include_router(scoring.router)
api_router.include_router(questions.router)
```
