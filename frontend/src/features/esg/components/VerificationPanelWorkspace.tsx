import VerificationSummaryPanel from '@/features/esg/components/VerificationSummaryPanel'
import VerificationTable from '@/features/esg/components/VerificationTable'
import { useVerificationState } from '@/features/esg/hooks/useVerificationState'
import { verificationFields } from '@/features/esg/mock/verificationData'

type VerificationPanelWorkspaceProps = {
  submissionId: string
}

function VerificationPanelWorkspace({
  submissionId,
}: VerificationPanelWorkspaceProps) {
  const { decisions, setDecision, summary } = useVerificationState(
    verificationFields.map((field) => field.key),
  )

  return (
    <section className="verification-layout">
      <article className="surface-card">
        <h2>Submission {submissionId}</h2>
        <p>
          Compare submitted values against extracted document values and assign
          field-level verification decisions.
        </p>
      </article>

      <VerificationTable
        fields={verificationFields}
        decisions={decisions}
        onDecisionChange={setDecision}
      />

      <VerificationSummaryPanel {...summary} />
    </section>
  )
}

export default VerificationPanelWorkspace
