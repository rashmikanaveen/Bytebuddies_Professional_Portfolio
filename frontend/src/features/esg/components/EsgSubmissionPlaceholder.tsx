import SectionCard from '@/components/ui/SectionCard'

type EsgSubmissionPlaceholderProps = {
  submissionId: string
}

function EsgSubmissionPlaceholder({
  submissionId,
}: EsgSubmissionPlaceholderProps) {
  return (
    <SectionCard
      title={`ESG Submission ${submissionId}`}
      description="E / S / G sectioned input form and document upload module will be implemented with reusable feature components."
    />
  )
}

export default EsgSubmissionPlaceholder
