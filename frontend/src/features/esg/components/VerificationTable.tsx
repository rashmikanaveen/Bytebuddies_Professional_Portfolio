import VerificationDecisionControl from '@/features/esg/components/VerificationDecisionControl'
import type { VerificationDecision } from '@/features/esg/hooks/useVerificationState'
import type { VerificationField } from '@/features/esg/mock/verificationData'

type VerificationTableProps = {
  fields: VerificationField[]
  decisions: Record<string, VerificationDecision>
  onDecisionChange: (fieldKey: string, decision: VerificationDecision) => void
}

function VerificationTable({
  fields,
  decisions,
  onDecisionChange,
}: VerificationTableProps) {
  return (
    <div className="surface-card">
      <h2>Field Verification Panel</h2>
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Submitted Value</th>
              <th>Extracted Value</th>
              <th>Required Document</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.key}>
                <td>{field.label}</td>
                <td>{field.submittedValue}</td>
                <td>{field.extractedValue}</td>
                <td>{field.requiredDocumentLabel}</td>
                <td>
                  <VerificationDecisionControl
                    value={decisions[field.key]}
                    onChange={(nextDecision) =>
                      onDecisionChange(field.key, nextDecision)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VerificationTable
