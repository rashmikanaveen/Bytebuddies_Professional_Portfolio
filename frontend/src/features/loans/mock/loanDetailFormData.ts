import type { ApplicantAnswerMap } from '@/features/applicant/apply/types'
import type { ApiApplicationRecord } from '@/lib/api/types'

const baseLoanDetailAnswers: ApplicantAnswerMap = {
  nic: '200112345678',
  name: 'Nadeesha Fernando',
  dob: '1990-04-14',
  address: '14 Lake Drive, Battaramulla, Colombo District',
  business_name: 'Bytebuddies Trading Ltd',
  employment_details:
    'Owner-managed manufacturing business focused on recyclable packaging solutions with 18 full-time employees.',
  income_details: '480000',
  expenses: '295000',
  requested_loan_amount: '250000',
  loan_purpose:
    'Purchase energy-efficient molding equipment and expand low-waste packaging production capacity.',
  existing_loans:
    'Working capital facility with Commercial Bank, outstanding balance LKR 120,000.',
  guarantor_availability: 'yes',
  supporting_documents:
    'Energy Audit 2025.pdf, ESG Policy.pdf, Carbon Disclosure.xlsx',
  renewable_energy_pct: '42% of total facility energy comes from rooftop solar.',
  waste_management_score:
    '4.2 / 5 - segregated recycling, licensed waste partner, and monthly tracking in place.',
  water_efficiency_score:
    '3.8 / 5 - closed-loop rinse process reduced water intensity by 18% over the last year.',
  env_violations: '0 violations reported in the last 3 years.',
  fair_labour_score:
    '4.5 / 5 - formal contracts, overtime controls, and annual labour compliance training.',
  data_protection_score:
    '3.9 / 5 - customer and employee records are access-controlled and reviewed quarterly.',
  board_independence_pct: '33%',
  anti_corruption_score:
    '4.1 / 5 - conflict-of-interest declarations and vendor due diligence are enforced.',
  financial_transparency_score:
    '4.4 / 5 - management accounts reviewed monthly and audited statements available.',
}

export const loanDetailDocuments = [
  'Energy Audit 2025.pdf',
  'ESG Policy.pdf',
  'Carbon Disclosure.xlsx',
]

export const loanDetailProofFiles: Record<string, string> = {
  renewable_energy_pct: 'Solar_Usage_Certificate_2025.pdf',
  waste_management_score: 'Waste_Handling_Audit_March2026.pdf',
  water_efficiency_score: 'Water_Efficiency_Benchmark_Report.xlsx',
  env_violations: 'Environmental_Compliance_Clearance.pdf',
  fair_labour_score: 'ILO_Labour_Compliance_Assessment.pdf',
  data_protection_score: 'PDPA_Internal_Control_Checklist.pdf',
  board_independence_pct: 'Board_Composition_Register_2026.pdf',
  anti_corruption_score: 'Anti_Corruption_Policy_Signed.pdf',
  financial_transparency_score: 'Audited_Financial_Statements_2025.pdf',
}

export function getLoanDetailFormAnswers(
  application: ApiApplicationRecord,
): ApplicantAnswerMap {
  return {
    ...baseLoanDetailAnswers,
    business_name: application.business_name,
    requested_loan_amount: String(application.loan_amount),
    loan_purpose: `${baseLoanDetailAnswers.loan_purpose} Industry: ${application.industry}.`,
  }
}