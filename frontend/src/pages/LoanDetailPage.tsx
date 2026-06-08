import { useParams } from 'react-router-dom'
import LoanDetailOverview from '@/features/loans/components/LoanDetailOverview'

function LoanDetailPage() {
  const { loanId = 'unknown-loan' } = useParams()

  return <LoanDetailOverview loanId={loanId} />
}

export default LoanDetailPage
