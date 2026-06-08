import { Link } from 'react-router-dom'
import type { ApiApplicationRecord } from '@/lib/api/types'

type LoansTableProps = {
  loans: ApiApplicationRecord[]
}

function LoansTable({ loans }: LoansTableProps) {
  if (loans.length === 0) {
    return (
      <div className="surface-card">
        <h2>Applications</h2>
        <p>No applications found.</p>
      </div>
    )
  }

  return (
    <div className="surface-card">
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>User ID</th>
              <th>Business Name</th>
              <th>Industry</th>
              <th>Loan Amount (LKR)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((application) => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.user_id}</td>
                <td>{application.business_name}</td>
                <td>{application.industry}</td>
                <td>{application.loan_amount.toLocaleString()}</td>
                <td>{application.status}</td>
                <td>
                  <Link
                    to={`/officer/loans/${application.application_id}`}
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
