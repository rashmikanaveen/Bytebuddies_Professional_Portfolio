import type { VerificationDecision } from '@/features/esg/hooks/useVerificationState'

type VerificationDecisionControlProps = {
  value: VerificationDecision
  onChange: (decision: VerificationDecision) => void
}

const decisionOptions: VerificationDecision[] = [
  'VERIFIED',
  'REJECTED',
  'CANNOT_VERIFY',
]

function VerificationDecisionControl({
  value,
  onChange,
}: VerificationDecisionControlProps) {
  return (
    <div className="decision-control">
      {decisionOptions.map((decision) => (
        <button
          key={decision}
          type="button"
          className={
            decision === value
              ? 'decision-btn decision-btn-active'
              : 'decision-btn'
          }
          onClick={() => onChange(decision)}
        >
          {decision}
        </button>
      ))}
    </div>
  )
}

export default VerificationDecisionControl
