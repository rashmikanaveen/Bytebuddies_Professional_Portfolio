export type PillarScore = {
  pillar: 'Environmental' | 'Social' | 'Governance'
  score: number
}

export type MetricContribution = {
  key: string
  label: string
  pillar: 'E' | 'S' | 'G'
  contribution: number
}

export type GreenScoreResult = {
  submissionId: string
  score: number
  grade: 'A' | 'B' | 'C' | 'D'
  gateStatus: 'PASS' | 'FAIL'
  gateReason: string
  pillars: PillarScore[]
  metricBreakdown: MetricContribution[]
}
