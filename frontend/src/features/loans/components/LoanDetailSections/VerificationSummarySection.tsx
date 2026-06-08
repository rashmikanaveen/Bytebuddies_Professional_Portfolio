import LoanStatusPill from '@/features/loans/components/LoanStatusPill'
import type { LoanRecord } from '@/features/loans/types'

type VerificationSummarySectionProps = {
  loan: LoanRecord
}

function VerificationSummarySection({ loan }: VerificationSummarySectionProps) {
  return (
    <article className="surface-card">
      <h2>Verification Summary</h2>
      <p>
        Current Status: <LoanStatusPill status={loan.status} />
      </p>
      <p>Outstanding flags: {loan.verificationFlags}</p>
    </article>
  )
}

export default VerificationSummarySection
