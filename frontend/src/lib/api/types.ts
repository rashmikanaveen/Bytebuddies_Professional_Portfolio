export type ApiMode = 'mock' | 'real'

export type ApiError = {
  message: string
  status?: number
}

export type ApiQuestionCategory = 'LOAN' | 'E' | 'S' | 'G'

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
  fileName: string
  status: 'uploaded'
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
