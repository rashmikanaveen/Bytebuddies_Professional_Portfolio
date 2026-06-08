import { Link } from 'react-router-dom'
import LoanStatusPill from '@/features/loans/components/LoanStatusPill'
import type { LoanRecord } from '@/features/loans/types'

type LoansTableProps = {
  loans: LoanRecord[]
}

function LoansTable({ loans }: LoansTableProps) {
  if (loans.length === 0) {
    return (
      <div className="surface-card">
        <h2>Loan Applications</h2>
        <p>No loans matched this filter.</p>
      </div>
    )
  }

  return (
    <div className="surface-card">
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Sector</th>
              <th>Amount (LKR)</th>
              <th>Green Score</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrower}</td>
                <td>{loan.sector}</td>
                <td>{loan.amountLkr.toLocaleString()}</td>
                <td>{loan.greenScore}</td>
                <td>
                  <LoanStatusPill status={loan.status} />
                </td>
                <td>{loan.updatedAt}</td>
                <td>
                  <Link
                    to={`/officer/loans/${loan.id}`}
                    className="table-link-btn"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoansTable
