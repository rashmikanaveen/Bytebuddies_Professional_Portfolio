import type { ReportRecord } from '@/features/reports/types'

type ReportsTableProps = {
  rows: ReportRecord[]
}

function ReportsTable({ rows }: ReportsTableProps) {
  return (
    <article className="surface-card">
      <h2>Generated Reports</h2>
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Generated Date</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.generatedAt}</td>
                <td>{row.category}</td>
                <td>{row.owner}</td>
                <td>{row.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default ReportsTable
