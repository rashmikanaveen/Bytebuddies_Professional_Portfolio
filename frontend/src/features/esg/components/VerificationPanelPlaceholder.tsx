import SectionCard from '@/components/ui/SectionCard'

type VerificationPanelPlaceholderProps = {
  submissionId: string
}

function VerificationPanelPlaceholder({
  submissionId,
}: VerificationPanelPlaceholderProps) {
  return (
    <SectionCard
      title={`Verification Panel ${submissionId}`}
      description="Side-by-side submitted vs extracted comparisons and field-level decisions will be implemented in this module."
    />
  )
}

export default VerificationPanelPlaceholder
