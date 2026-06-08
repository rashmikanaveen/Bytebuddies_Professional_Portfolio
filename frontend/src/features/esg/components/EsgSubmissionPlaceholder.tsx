import EsgSubmissionForm from '@/features/esg/components/EsgSubmissionForm'

type EsgSubmissionPlaceholderProps = {
  submissionId: string
}

function EsgSubmissionPlaceholder({
  submissionId,
}: EsgSubmissionPlaceholderProps) {
  return <EsgSubmissionForm submissionId={submissionId} />
}

export default EsgSubmissionPlaceholder
