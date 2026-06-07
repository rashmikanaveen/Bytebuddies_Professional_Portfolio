type VerificationSummaryPanelProps = {
  unresolved: number
  verified: number
  rejected: number
  cannotVerify: number
}

function VerificationSummaryPanel({
  unresolved,
  verified,
  rejected,
  cannotVerify,
}: VerificationSummaryPanelProps) {
  return (
    <aside className="surface-card verification-summary-panel">
      <h2>Decision Summary</h2>
      <p>Unresolved fields: {unresolved}</p>
      <p>Verified: {verified}</p>
      <p>Rejected: {rejected}</p>
      <p>Cannot Verify: {cannotVerify}</p>
      <button type="button" className="primary-btn">
        Submit Verification
      </button>
    </aside>
  )
}

export default VerificationSummaryPanel
