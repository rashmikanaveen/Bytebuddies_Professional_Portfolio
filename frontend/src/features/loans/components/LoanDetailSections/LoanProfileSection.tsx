import type { LoanRecord } from '@/features/loans/types'

type LoanProfileSectionProps = {
  loan: LoanRecord
}

function LoanProfileSection({ loan }: LoanProfileSectionProps) {
  return (
    <article className="surface-card">
      <h2>Loan Profile</h2>
      <p>Loan ID: {loan.id}</p>
      <p>Amount (LKR): {loan.amountLkr.toLocaleString()}</p>
      <p>Updated: {loan.updatedAt}</p>
    </article>
  )
}

export default LoanProfileSection
