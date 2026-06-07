import VerificationPanelWorkspace from '@/features/esg/components/VerificationPanelWorkspace'

type VerificationPanelPlaceholderProps = {
  submissionId: string
}

function VerificationPanelPlaceholder({
  submissionId,
}: VerificationPanelPlaceholderProps) {
  return <VerificationPanelWorkspace submissionId={submissionId} />
}

export default VerificationPanelPlaceholder
