import SectionCard from '@/components/ui/SectionCard'

type LoanDetailOverviewProps = {
  loanId: string
}

function LoanDetailOverview({ loanId }: LoanDetailOverviewProps) {
  return (
    <SectionCard
      title={`Loan Detail ${loanId}`}
      description="Read-only borrower, loan profile, ESG values, and verification summary will be composed in modular sections in Phase 2."
    />
  )
}

export default LoanDetailOverview
