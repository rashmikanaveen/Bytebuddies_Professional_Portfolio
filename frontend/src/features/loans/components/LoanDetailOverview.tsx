import BorrowerSection from '@/features/loans/components/LoanDetailSections/BorrowerSection'
import DocumentsSection from '@/features/loans/components/LoanDetailSections/DocumentsSection'
import EsgValuesSection from '@/features/loans/components/LoanDetailSections/EsgValuesSection'
import LoanProfileSection from '@/features/loans/components/LoanDetailSections/LoanProfileSection'
import VerificationSummarySection from '@/features/loans/components/LoanDetailSections/VerificationSummarySection'
import { officerLoans } from '@/features/loans/mock/loanData'

type LoanDetailOverviewProps = {
  loanId: string
}

function LoanDetailOverview({ loanId }: LoanDetailOverviewProps) {
  const loan = officerLoans.find((candidate) => candidate.id === loanId)

  if (!loan) {
    return (
      <section className="surface-card">
        <h2>Loan Detail {loanId}</h2>
        <p>No matching loan was found for this reference.</p>
      </section>
    )
  }

  return (
    <section className="loan-detail-grid">
      <BorrowerSection loan={loan} />
      <LoanProfileSection loan={loan} />
      <EsgValuesSection loan={loan} />
      <VerificationSummarySection loan={loan} />
      <DocumentsSection loan={loan} />
    </section>
  )
}

export default LoanDetailOverview
