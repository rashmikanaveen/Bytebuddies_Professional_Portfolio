export type VerificationField = {
  key: string
  label: string
  submittedValue: string
  extractedValue: string
  requiredDocumentLabel: string
}

export const verificationFields: VerificationField[] = [
  {
    key: 'renewable_energy_pct',
    label: 'Renewable Energy (%)',
    submittedValue: '62',
    extractedValue: '60',
    requiredDocumentLabel: 'Energy audit report',
  },
  {
    key: 'carbon_intensity',
    label: 'Carbon Intensity',
    submittedValue: '44',
    extractedValue: '49',
    requiredDocumentLabel: 'Carbon disclosure report',
  },
  {
    key: 'workplace_incidents',
    label: 'Workplace Incidents',
    submittedValue: '3',
    extractedValue: '3',
    requiredDocumentLabel: 'Health and safety report',
  },
  {
    key: 'board_independence_pct',
    label: 'Board Independence (%)',
    submittedValue: '40',
    extractedValue: '36',
    requiredDocumentLabel: 'Corporate governance statement',
  },
]
