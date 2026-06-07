import SectionCard from '@/components/ui/SectionCard'

type ScoreResultPlaceholderProps = {
  submissionId: string
}

function ScoreResultPlaceholder({ submissionId }: ScoreResultPlaceholderProps) {
  return (
    <SectionCard
      title={`Score Result ${submissionId}`}
      description="Score gauge, grade badge, E/S/G bars, and contribution breakdown modules will be implemented here."
    />
  )
}

export default ScoreResultPlaceholder
