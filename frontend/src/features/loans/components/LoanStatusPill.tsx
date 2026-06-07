import type { LoanStatus } from '@/features/loans/types'

type LoanStatusPillProps = {
  status: LoanStatus
}

function LoanStatusPill({ status }: LoanStatusPillProps) {
  return (
    <span className={`loan-status-pill loan-status-${status}`}>{status}</span>
  )
}

export default LoanStatusPill
