function DashboardOverview() {
  return (
    <section className="page-grid">
      <article className="surface-card stat-card">
        <p className="card-label">Total Active Loans</p>
        <p className="card-value">1,284</p>
      </article>
      <article className="surface-card stat-card">
        <p className="card-label">Average Green Score</p>
        <p className="card-value success">78.4</p>
      </article>
      <article className="surface-card stat-card">
        <p className="card-label">Flagged Verifications</p>
        <p className="card-value warning">36</p>
      </article>
      <article className="surface-card chart-card">
        <h2>Portfolio Trend (Placeholder)</h2>
        <p>Chart module will be integrated in Phase 2 implementation tasks.</p>
      </article>
    </section>
  )
}

export default DashboardOverview
