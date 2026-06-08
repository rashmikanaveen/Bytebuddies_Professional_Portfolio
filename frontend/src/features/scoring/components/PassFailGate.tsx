type PassFailGateProps = {
  status: 'PASS' | 'FAIL'
  reason: string
}

function PassFailGate({ status, reason }: PassFailGateProps) {
  return (
    <article className="surface-card">
      <h2>Credit Gate</h2>
      <p className={`gate-pill gate-${status}`}>{status}</p>
      <p>{reason}</p>
    </article>
  )
}

export default PassFailGate
