export type ReportRecord = {
  id: string
  generatedAt: string
  category: 'Loan Pipeline' | 'Verification Queue' | 'Score Distribution'
  owner: string
  format: 'PDF' | 'CSV'
}
