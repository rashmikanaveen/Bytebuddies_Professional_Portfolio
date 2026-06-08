import { useMemo, useState } from 'react'
import type {
  ApplicantQuestion,
  ApplicantQuestionSection,
} from '@/features/applicant/apply/types'

const sectionTitleMap: Record<'LOAN' | 'E' | 'S' | 'G', string> = {
  LOAN: 'Loan Application Details',
  E: 'Environmental Inputs',
  S: 'Social Inputs',
  G: 'Governance Inputs',
}

const HARDCODED_QUESTIONS: ApplicantQuestion[] = [
  // =====================
  // LOAN DETAILS
  // =====================
  {
    id: 1,
    key: 'nic',
    category: 'LOAN',
    label: 'NIC (National Identity Card)',
    fieldType: 'text',
    required: true,
    placeholder: '200012345678 or 123456789V',
    maxLength: 12,
    order: 1,
  },
  {
    id: 2,
    key: 'name',
    category: 'LOAN',
    label: 'Full Name',
    fieldType: 'text',
    required: true,
    placeholder: 'Full legal name',
    maxLength: 80,
    order: 3,
  },
  {
    id: 3,
    key: 'dob',
    category: 'LOAN',
    label: 'Date of Birth (DOB)',
    fieldType: 'text',
    required: true,
    placeholder: 'YYYY-MM-DD',
    maxLength: 10,
    order: 2,
  },
  {
    id: 4,
    key: 'address',
    category: 'LOAN',
    label: 'Residential Address',
    fieldType: 'textarea',
    required: true,
    placeholder: 'House number, street, city, district',
    maxLength: 180,
    order: 4,
  },
  {
    id: 5,
    key: 'business_name',
    category: 'LOAN',
    label: 'Business Name',
    fieldType: 'text',
    required: true,
    placeholder: 'Registered business name',
    maxLength: 100,
    order: 5,
  },
  {
    id: 6,
    key: 'employment_details',
    category: 'LOAN',
    label: 'Employment Details',
    fieldType: 'textarea',
    required: true,
    placeholder: 'Employer, role, years employed, or business activity',
    maxLength: 220,
    order: 6,
  },
  {
    id: 7,
    key: 'income_details',
    category: 'LOAN',
    label: 'Income Details',
    fieldType: 'number',
    required: true,
    placeholder: 'Monthly income in LKR',
    min: 0,
    max: 999999999,
    order: 7,
  },
  {
    id: 8,
    key: 'expenses',
    category: 'LOAN',
    label: 'Expenses',
    fieldType: 'number',
    required: true,
    placeholder: 'Monthly expenses in LKR',
    min: 0,
    max: 999999999,
    order: 8,
  },
  {
    id: 9,
    key: 'requested_loan_amount',
    category: 'LOAN',
    label: 'Requested Loan Amount',
    fieldType: 'number',
    required: true,
    placeholder: 'Amount in LKR',
    min: 1000,
    max: 9999999999,
    order: 9,
  },
  {
    id: 10,
    key: 'loan_purpose',
    category: 'LOAN',
    label: 'Loan Purpose',
    fieldType: 'textarea',
    required: true,
    placeholder: 'Briefly describe how the loan will be used',
    maxLength: 240,
    order: 10,
  },
  {
    id: 11,
    key: 'existing_loans',
    category: 'LOAN',
    label: 'Existing Loans',
    fieldType: 'textarea',
    required: false,
    placeholder: 'Loan provider, balance, installment, or write none',
    maxLength: 220,
    order: 11,
  },
  {
    id: 12,
    key: 'guarantor_availability',
    category: 'LOAN',
    label: 'Guarantor Availability',
    fieldType: 'select',
    required: true,
    order: 12,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: 13,
    key: 'supporting_documents',
    category: 'LOAN',
    label:
      'Supporting Documents (salary slips, bank statements, utility bills, etc.)',
    fieldType: 'text',
    required: true,
    placeholder: 'List documents you will attach',
    maxLength: 160,
    order: 13,
  },

  // =====================
  // ENVIRONMENTAL
  // =====================
  {
    id: 14,
    key: 'renewable_energy_pct',
    category: 'E',
    label:
      'What percentage of your total energy consumption comes from renewable sources (solar, wind, hydro, etc.)?',
    fieldType: 'text',
    required: true,
    order: 14,
  },
  {
    id: 15,
    key: 'waste_management_score',
    category: 'E',
    label:
      'How does your organisation manage waste? Rate 0–5 based on GRI 306.',
    fieldType: 'text',
    required: true,
    order: 15,
  },
  {
    id: 16,
    key: 'water_efficiency_score',
    category: 'E',
    label:
      'How does your water consumption compare to your industry benchmark? Rate 0–5.',
    fieldType: 'text',
    required: true,
    order: 16,
  },
  {
    id: 17,
    key: 'env_violations',
    category: 'E',
    label:
      'How many environmental compliance violations has your organisation received in the last 3 years?',
    fieldType: 'text',
    required: true,
    order: 17,
  },

  // =====================
  // SOCIAL
  // =====================
  {
    id: 18,
    key: 'fair_labour_score',
    category: 'S',
    label:
      'How well does your organisation adhere to ILO Core Labour Standards? Rate 0–5.',
    fieldType: 'text',
    required: true,
    order: 18,
  },
  {
    id: 19,
    key: 'data_protection_score',
    category: 'S',
    label:
      'How compliant is your organisation with Sri Lanka PDPA? Rate 0–5.',
    fieldType: 'text',
    required: true,
    order: 19,
  },

  // =====================
  // GOVERNANCE
  // =====================
  {
    id: 20,
    key: 'board_independence_pct',
    category: 'G',
    label:
      'What percentage of your board of directors are independent non-executive directors?',
    fieldType: 'text',
    required: true,
    order: 20,
  },
  {
    id: 21,
    key: 'anti_corruption_score',
    category: 'G',
    label:
      "How robust is your organisation's anti-corruption policy? Rate 0–5.",
    fieldType: 'text',
    required: true,
    order: 21,
  },
  {
    id: 22,
    key: 'financial_transparency_score',
    category: 'G',
    label:
      'How would you rate your financial transparency and reporting quality? Rate 0–5.',
    fieldType: 'text',
    required: true,
    order: 22,
  },
]

export function useApplicantQuestions() {
  const [questions] = useState<ApplicantQuestion[]>(HARDCODED_QUESTIONS)

  const loading = false
  const error = null

  const sections = useMemo<ApplicantQuestionSection[]>(() => {
    const categories: Array<'LOAN' | 'E' | 'S' | 'G'> = [
      'LOAN',
      'E',
      'S',
      'G',
    ]

    return categories
      .map((category) => ({
        key: category,
        title: sectionTitleMap[category],
        questions: questions
          .filter((question) => question.category === category)
          .sort((a, b) => a.order - b.order),
      }))
      .filter((section) => section.questions.length > 0)
  }, [questions])

  return {
    loading,
    error,
    questions,
    sections,
  }
}
