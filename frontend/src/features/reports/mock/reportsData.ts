import type { ReportRecord } from '@/features/reports/types'

export const reportRecords: ReportRecord[] = [
  {
    id: 'RPT-2026-1201',
    generatedAt: '2026-06-02',
    category: 'Loan Pipeline',
    owner: 'Loan Ops Team',
    format: 'CSV',
  },
  {
    id: 'RPT-2026-1202',
    generatedAt: '2026-06-03',
    category: 'Verification Queue',
    owner: 'Risk Control',
    format: 'PDF',
  },
  {
    id: 'RPT-2026-1203',
    generatedAt: '2026-06-05',
    category: 'Score Distribution',
    owner: 'Sustainability Office',
    format: 'PDF',
  },
]
