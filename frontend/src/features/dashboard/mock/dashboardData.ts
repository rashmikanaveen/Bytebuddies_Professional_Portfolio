export const dashboardKpis = [
  { label: 'Total Active Loans', value: '1,284' },
  { label: 'Average Green Score', value: '78.4', tone: 'success' as const },
  { label: 'Flagged Verifications', value: '36', tone: 'warning' as const },
]

export const pendingVerifications = [
  { id: 'SUB-2043', borrower: 'Lanka Textiles PLC', due: 'Today', fields: 4 },
  {
    id: 'SUB-2040',
    borrower: 'Ceylon Agro Exports',
    due: 'Tomorrow',
    fields: 2,
  },
  { id: 'SUB-2037', borrower: 'BlueOcean Foods', due: 'Jun 09', fields: 5 },
]

export const recentSubmissions = [
  { id: 'GL-2026-104', company: 'SunGrid Energy', sector: 'Energy', score: 84 },
  {
    id: 'GL-2026-102',
    company: 'Harbor Logistics',
    sector: 'Transport',
    score: 76,
  },
  {
    id: 'GL-2026-097',
    company: 'Horizon Manufacturing',
    sector: 'Manufacturing',
    score: 81,
  },
]
