import { reportRecords } from '@/features/reports/mock/reportsData'
import { sectorMatrices } from '@/features/admin/weights/mock/matrixData'
import type {
  ApiApplicationCreatePayload,
  ApiApplicationCreateResult,
  ApiCreateQuestionPayload,
  ApiDocumentUploadResult,
  ApiQuestion,
  ApiQuestionResponsePayload,
  ApiQuestionResponseResult,
  ApiReportResult,
  ApiScoreResult,
  ApiWeightsResult,
} from '@/lib/api/types'

let questionsStore: ApiQuestion[] = [
  {
    id: 1,
    key: 'business_name',
    label: 'Company Name',
    category: 'LOAN',
    fieldType: 'text',
    required: true,
    placeholder: 'Example Holdings Ltd',
    order: 1,
  },
  {
    id: 2,
    key: 'requested_loan_amount',
    label: 'Requested Loan Amount (LKR)',
    category: 'LOAN',
    fieldType: 'number',
    required: true,
    placeholder: '25000000',
    order: 2,
  },
  {
    id: 3,
    key: 'loan_purpose',
    label: 'Loan Purpose',
    category: 'LOAN',
    fieldType: 'textarea',
    required: true,
    placeholder:
      'Describe how this loan supports operations and sustainability goals',
    order: 3,
  },
  {
    id: 4,
    key: 'renewable_energy_pct',
    label: 'Renewable Energy Percentage',
    category: 'E',
    fieldType: 'number',
    required: true,
    placeholder: '62',
    order: 4,
  },
  {
    id: 5,
    key: 'workplace_incident_disclosure',
    label: 'Workplace Safety Program in Place',
    category: 'S',
    fieldType: 'boolean',
    required: true,
    order: 5,
  },
  {
    id: 6,
    key: 'board_independence_band',
    label: 'Board Independence Band',
    category: 'G',
    fieldType: 'select',
    required: true,
    options: [
      { label: 'Below 25%', value: 'below_25' },
      { label: '25% - 50%', value: '25_to_50' },
      { label: 'Above 50%', value: 'above_50' },
    ],
    order: 6,
  },
]

const responseStore = new Map<string, ApiQuestionResponsePayload['responses']>()

export async function listQuestionsMock(): Promise<ApiQuestion[]> {
  return [...questionsStore].sort((a, b) => a.order - b.order)
}

export async function createQuestionMock(
  payload: ApiCreateQuestionPayload,
): Promise<ApiQuestion> {
  const next: ApiQuestion = { ...payload, id: questionsStore.length + 1 }
  questionsStore = [...questionsStore, next]
  return next
}

export async function createApplicationMock(
  payload: ApiApplicationCreatePayload,
): Promise<ApiApplicationCreateResult> {
  return {
    applicationId: `APP-${Date.now()}`,
    status: payload.businessName ? 'SUBMITTED' : 'DRAFT',
  }
}

export async function submitQuestionResponsesMock(
  payload: ApiQuestionResponsePayload,
): Promise<ApiQuestionResponseResult> {
  responseStore.set(payload.applicationId, payload.responses)
  return {
    applicationId: payload.applicationId,
    saved: payload.responses.length,
  }
}

export async function getQuestionResponsesMock(applicationId: string) {
  return {
    applicationId,
    responses: responseStore.get(applicationId) ?? [],
  }
}

export async function uploadDocumentMock(
  file: File,
): Promise<ApiDocumentUploadResult> {
  return {
    fileName: file.name,
    status: 'uploaded',
  }
}

export async function getScoreMock(): Promise<ApiScoreResult> {
  return { score: 82, grade: 'A' }
}

export async function getReportsMock(): Promise<ApiReportResult[]> {
  return reportRecords
}

export async function getAdminWeightsMock(): Promise<ApiWeightsResult[]> {
  return sectorMatrices.map((matrix) => ({
    sector: matrix.sector,
    consistencyRatio: matrix.consistencyRatio,
  }))
}
