import type { GreenScoreResult } from '@/features/scoring/types'

export function getScoreResult(submissionId: string): GreenScoreResult {
  return {
    submissionId,
    score: 78,
    grade: 'B',
    gateStatus: 'PASS',
    gateReason:
      'All mandatory ESG fields verified and risk thresholds are within policy tolerance.',
    pillars: [
      { pillar: 'Environmental', score: 82 },
      { pillar: 'Social', score: 74 },
      { pillar: 'Governance', score: 76 },
    ],
    metricBreakdown: [
      {
        key: 'renewable_energy_pct',
        label: 'Renewable Energy Percentage',
        pillar: 'E',
        contribution: 12.4,
      },
      {
        key: 'carbon_intensity',
        label: 'Carbon Intensity',
        pillar: 'E',
        contribution: 10.2,
      },
      {
        key: 'training_hours',
        label: 'Employee Training Hours',
        pillar: 'S',
        contribution: 8.9,
      },
      {
        key: 'community_investment',
        label: 'Community Investment',
        pillar: 'S',
        contribution: 7.8,
      },
      {
        key: 'board_independence_pct',
        label: 'Board Independence',
        pillar: 'G',
        contribution: 9.1,
      },
      {
        key: 'audit_compliance_pct',
        label: 'Audit Compliance',
        pillar: 'G',
        contribution: 11.3,
      },
    ],
  }
}
