import { useState } from 'react'
import {
  useApplicationsApi,
  useDocumentsApi,
  useQuestionResponsesApi,
} from '@/lib/api/hooks'
import type {
  ApplicantAnswerValue,
  ApplicantQuestion,
} from '@/features/applicant/apply/types'

export function useApplicantSubmission() {
  const { createApplication } = useApplicationsApi()
  const { submitResponses } = useQuestionResponsesApi()
  const { uploadDocument } = useDocumentsApi()
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  async function submitApplication(
    questions: ApplicantQuestion[],
    answers: Record<string, ApplicantAnswerValue>,
    files: File[],
  ) {
    setSubmitting(true)
    setSubmitMessage(null)

    try {
      const businessName = String(answers.business_name ?? '')
      const loanAmount = Number(answers.requested_loan_amount ?? 0)
      const purpose = String(answers.loan_purpose ?? '')

      const appResult = await createApplication({
        businessName,
        loanAmount,
        purpose,
      })

      await submitResponses({
        applicationId: appResult.applicationId,
        responses: questions
          .filter((question) => answers[question.key] !== undefined)
          .map((question) => ({
            questionId: question.id,
            value: String(answers[question.key]),
          })),
      })

      await Promise.all(
        files.map((file) => uploadDocument(appResult.applicationId, file)),
      )

      setSubmitMessage(
        `Application ${appResult.applicationId} submitted successfully.`,
      )
    } catch {
      setSubmitMessage('Unable to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    submitMessage,
    submitApplication,
  }
}
