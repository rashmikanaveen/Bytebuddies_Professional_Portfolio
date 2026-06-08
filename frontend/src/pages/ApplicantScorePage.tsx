import ApplicantBreakdownChart from '@/features/scoring/components/ApplicantBreakdownChart'

const applicantBreakdown = [
  { name: 'Environmental', value: 82 },
  { name: 'Social', value: 79 },
  { name: 'Governance', value: 87 },
]

function ApplicantScorePage() {
  return (
    <section className="page-grid">
      <article className="surface-card stat-card">
        <p className="card-label">Latest Green Score</p>
        <p className="card-value success">82.6</p>
      </article>
      <article className="surface-card stat-card">
        <p className="card-label">Grade</p>
        <p className="card-value">A</p>
      </article>
      <article className="surface-card stat-card">
        <p className="card-label">Eligibility</p>
        <p className="card-value success">Pass</p>
      </article>
      <article className="surface-card chart-card">
        <h2>E / S / G Breakdown</h2>
        <p>
          Current subscore distribution across environmental, social, and
          governance pillars.
        </p>
        <ApplicantBreakdownChart values={applicantBreakdown} />
      </article>
    </section>
  )
}

export default ApplicantScorePage
