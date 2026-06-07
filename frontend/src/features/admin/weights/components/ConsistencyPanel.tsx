type ConsistencyPanelProps = {
  consistencyRatio: number
}

function ConsistencyPanel({ consistencyRatio }: ConsistencyPanelProps) {
  const withinThreshold = consistencyRatio <= 0.1

  return (
    <article className="surface-card">
      <h2>Consistency Check</h2>
      <p
        className={
          withinThreshold ? 'dashboard-score-pill' : 'gate-pill gate-FAIL'
        }
      >
        CR: {consistencyRatio.toFixed(2)}
      </p>
      <p>
        {withinThreshold
          ? 'Matrix is within accepted threshold (CR <= 0.10).'
          : 'Matrix exceeds threshold. Adjust comparisons before submission.'}
      </p>
      <button type="button" className="primary-btn">
        Submit Updated Matrix
      </button>
    </article>
  )
}

export default ConsistencyPanel
