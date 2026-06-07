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
          Contribution chart placeholder for environment, social, and governance
          subscores.
        </p>
      </article>
    </section>
  )
}

export default ApplicantScorePage
