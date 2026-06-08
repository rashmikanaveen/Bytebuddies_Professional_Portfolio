import ScoreResultWorkspace from '@/features/scoring/components/ScoreResultWorkspace'

type ScoreResultPlaceholderProps = {
  submissionId: string
}

function ScoreResultPlaceholder({ submissionId }: ScoreResultPlaceholderProps) {
  return <ScoreResultWorkspace submissionId={submissionId} />
}

export default ScoreResultPlaceholder
