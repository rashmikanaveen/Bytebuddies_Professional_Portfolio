import { reportRecords } from '@/features/reports/mock/reportsData'
import { sectorMatrices } from '@/features/admin/weights/mock/matrixData'
import type {
  ApiApplicationCreatePayload,
  ApiApplicationCreateResult,
  ApiCreateQuestionPayload,
  ApiDocumentUploadResult,
  ApiDocumentVerificationResult,
  ApiQuestion,
  ApiQuestionResponsePayload,
  ApiQuestionResponseResult,
  ApiReportResult,
  ApiScoreResult,
  ApiWeightsResult,
  ApiAuthUser,
  ApiLoginPayload,
  ApiLoginResult,
  ApiRegisterPayload,
  ApiRegisterResult,
} from '@/lib/api/types'

let mockUsers: ApiAuthUser[] = [
  {
    name: 'Kumara Perera',
    email: 'officer@greenflow.lk',
    role: 'loan_officer',
  },
  {
    name: 'Nadeesha Fernando',
    email: 'manager@greenflow.lk',
    role: 'manager',
  },
  {
    name: 'Ruwan Jayasinghe',
    email: 'admin@greenflow.lk',
    role: 'admin',
  },
  {
    name: 'Saman Holdings',
    email: 'applicant@greenflow.lk',
    role: 'applicant',
  },
]

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
    documentId: Date.now(),
    fileName: file.name,
    status: 'uploaded',
  }
}

export async function verifyDocumentMock(
  applicationId: string,
): Promise<ApiDocumentVerificationResult> {
  return {
    applicationId,
    confidenceScore: 0.92,
    status: 'SYSTEM_VERIFIED',
    message: 'Proof document verified.',
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

export async function loginMock(
  payload: ApiLoginPayload,
): Promise<ApiLoginResult> {
  const existing = mockUsers.find(
    (user) => user.email.toLowerCase() === payload.email.toLowerCase(),
  ) ?? {
    name: payload.email.split('@')[0],
    email: payload.email,
    role: 'applicant',
  }

  return {
    access_token: 'mock-token',
    token_type: 'bearer',
    user: existing,
  }
}

export async function registerMock(
  payload: ApiRegisterPayload,
): Promise<ApiRegisterResult> {
  const nextUser: ApiAuthUser = {
    name: payload.name,
    email: payload.email,
    role: payload.role,
    profileImageUrl: payload.profileImageUrl,
  }

  mockUsers = [nextUser, ...mockUsers]

  return {
    msg: 'User registered successfully',
    user_id: mockUsers.length,
    user: nextUser,
  }
}
