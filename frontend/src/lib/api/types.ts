export type ApiMode = 'mock' | 'real'

export type ApiError = {
  message: string
  status?: number
}

export type ApiQuestionCategory = 'LOAN' | 'E' | 'S' | 'G'

export type ApiUserRole = 'loan_officer' | 'manager' | 'admin' | 'applicant'

export type ApiAuthUser = {
  name: string
  email: string
  role: ApiUserRole
  profileImageUrl?: string
}

export type ApiLoginPayload = {
  email: string
  password: string
}

export type ApiLoginResult = {
  access_token: string
  token_type: string
  user: ApiAuthUser
}

export type ApiRegisterPayload = {
  name: string
  email: string
  password: string
  role: ApiUserRole
  profileImageUrl?: string
}

export type ApiRegisterResult = {
  msg: string
  user_id: number
  user: ApiAuthUser
}

export type ApiQuestionFieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'boolean'

export type ApiQuestionOption = {
  label: string
  value: string
}

export type ApiQuestion = {
  id: number
  key: string
  label: string
  category: ApiQuestionCategory
  fieldType: ApiQuestionFieldType
  required: boolean
  placeholder?: string
  helpText?: string
  maxLength?: number
  min?: number
  max?: number
  order: number
  options?: ApiQuestionOption[]
}

export type ApiCreateQuestionPayload = Omit<ApiQuestion, 'id'>

export type ApiApplicationCreatePayload = {
  businessName: string
  loanAmount: number
  purpose: string
}

export type ApiApplicationCreateResult = {
  applicationId: string
  status: 'DRAFT' | 'SUBMITTED'
}

export type ApiApplicationRecord = {
  application_id: number
  user_id: number
  business_name: string
  industry: string
  status: string
  loan_amount: number
}

export type ApiQuestionResponsePayload = {
  applicationId: string
  responses: Array<{
    questionId: number
    value: string
  }>
}

export type ApiQuestionResponseResult = {
  applicationId: string
  saved: number
}

export type ApiDocumentUploadResult = {
  documentId?: number
  fileName: string
  status: 'uploaded'
}

export type ApiDocumentVerificationResult = {
  applicationId: string
  confidenceScore: number
  status: 'SYSTEM_VERIFIED' | 'FLAGGED_FOR_OFFICER' | 'verified' | 'flagged'
  message: string
}

export type ApiScoreResult = {
  score: number
  grade: 'A' | 'B' | 'C' | 'D'
}

export type ApiReportResult = {
  id: string
  generatedAt: string
  category: string
  owner: string
  format: string
}

export type ApiWeightsResult = {
  sector: string
  consistencyRatio: number
}
