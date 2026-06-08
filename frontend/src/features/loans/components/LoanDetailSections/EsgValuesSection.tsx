import type { LoanRecord } from '@/features/loans/types'

type EsgValuesSectionProps = {
  loan: LoanRecord
}

function EsgValuesSection({ loan }: EsgValuesSectionProps) {
  return (
    <article className="surface-card">
      <h2>ESG Values Snapshot</h2>
      <p>Green Score: {loan.greenScore}</p>
      <p>Verification Flags: {loan.verificationFlags}</p>
    </article>
  )
}

export default EsgValuesSection
