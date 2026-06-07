import type { MetricContribution } from '@/features/scoring/types'

type MetricContributionTableProps = {
  rows: MetricContribution[]
}

function MetricContributionTable({ rows }: MetricContributionTableProps) {
  return (
    <article className="surface-card">
      <h2>Per-metric Contribution Breakdown</h2>
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Pillar</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                <td>{row.pillar}</td>
                <td>{row.contribution.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default MetricContributionTable
