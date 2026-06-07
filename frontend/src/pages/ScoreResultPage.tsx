import { useParams } from 'react-router-dom'
import ScoreResultPlaceholder from '@/features/scoring/components/ScoreResultPlaceholder'

function ScoreResultPage() {
  const { submissionId = 'new-submission' } = useParams()

  return <ScoreResultPlaceholder submissionId={submissionId} />
}

export default ScoreResultPage
