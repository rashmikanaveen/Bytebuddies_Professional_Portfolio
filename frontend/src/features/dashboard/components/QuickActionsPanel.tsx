function QuickActionsPanel() {
  return (
    <article className="surface-card dashboard-panel">
      <h2>Quick Actions</h2>
      <div className="dashboard-actions">
        <button type="button" className="secondary-btn">
          Review Verification Queue
        </button>
        <button type="button" className="secondary-btn">
          Open Loan Pipeline
        </button>
        <button type="button" className="secondary-btn">
          Start ESG Assessment
        </button>
      </div>
    </article>
  )
}

export default QuickActionsPanel
