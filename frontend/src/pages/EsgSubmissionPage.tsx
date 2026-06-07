import { useParams } from 'react-router-dom'
import EsgSubmissionPlaceholder from '@/features/esg/components/EsgSubmissionPlaceholder'

function EsgSubmissionPage() {
  const { submissionId = 'new-submission' } = useParams()

  return <EsgSubmissionPlaceholder submissionId={submissionId} />
}

export default EsgSubmissionPage
