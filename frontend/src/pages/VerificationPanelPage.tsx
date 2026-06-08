import { useParams } from 'react-router-dom'
import VerificationPanelPlaceholder from '@/features/esg/components/VerificationPanelPlaceholder'

function VerificationPanelPage() {
  const { submissionId = 'new-submission' } = useParams()

  return <VerificationPanelPlaceholder submissionId={submissionId} />
}

export default VerificationPanelPage
