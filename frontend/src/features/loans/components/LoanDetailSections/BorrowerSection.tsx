import type { LoanRecord } from '@/features/loans/types'

type BorrowerSectionProps = {
  loan: LoanRecord
}

function BorrowerSection({ loan }: BorrowerSectionProps) {
  return (
    <article className="surface-card">
      <h2>Borrower</h2>
      <p>{loan.borrower}</p>
      <p className="dashboard-list-meta">Sector: {loan.sector}</p>
    </article>
  )
}

export default BorrowerSection
