import type { EsgMetricField } from '@/features/esg/types'

export const esgMetricFields: EsgMetricField[] = [
  {
    key: 'renewable_energy_pct',
    label: 'Renewable Energy (%)',
    section: 'environmental',
    requiredDocumentLabel: 'Energy audit report',
  },
  {
    key: 'carbon_intensity',
    label: 'Carbon Intensity (tCO2e / output)',
    section: 'environmental',
    requiredDocumentLabel: 'Carbon disclosure report',
  },
  {
    key: 'workplace_incidents',
    label: 'Workplace Incidents (annual)',
    section: 'social',
    requiredDocumentLabel: 'Health and safety report',
  },
  {
    key: 'training_hours',
    label: 'Employee Training Hours',
    section: 'social',
    requiredDocumentLabel: 'HR training records',
  },
  {
    key: 'board_independence_pct',
    label: 'Board Independence (%)',
    section: 'governance',
    requiredDocumentLabel: 'Corporate governance statement',
  },
  {
    key: 'audit_compliance_score',
    label: 'Audit Compliance Score',
    section: 'governance',
    requiredDocumentLabel: 'Audit committee report',
  },
]
