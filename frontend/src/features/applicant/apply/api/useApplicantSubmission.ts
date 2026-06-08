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
  const { uploadDocument, verifyDocument } = useDocumentsApi()
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  async function submitLoanDetails(
    answers: Record<string, ApplicantAnswerValue>,
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

      setApplicationId(appResult.applicationId)
      return appResult.applicationId
    } catch {
      setSubmitMessage('Unable to create draft application. Please try again.')
      return null
    } finally {
      setSubmitting(false)
    }
  }

  async function uploadEsgDocument(
    file: File,
    targetApplicationId = applicationId,
  ) {
    if (!targetApplicationId) {
      throw new Error(
        'Application ID is missing. Please submit loan details first.',
      )
    }

    try {
      return await uploadDocument(targetApplicationId, file)
    } catch (err) {
      console.error('Failed to upload document:', err)
      throw err
    }
  }

  async function verifyEsgDocument(targetApplicationId = applicationId) {
    if (!targetApplicationId) {
      throw new Error(
        'Application ID is missing. Please submit loan details first.',
      )
    }

    try {
      return await verifyDocument(targetApplicationId)
    } catch (err) {
      console.error('Failed to verify document:', err)
      throw err
    }
  }

  async function finalizeApplication(
    questions: ApplicantQuestion[],
    answers: Record<string, ApplicantAnswerValue>,
    targetApplicationId = applicationId,
  ) {
    if (!targetApplicationId) {
      setSubmitMessage(
        'Application ID is missing. Please submit loan details first.',
      )
      return
    }

    setSubmitting(true)
    setSubmitMessage(null)

    try {
      await submitResponses({
        applicationId: targetApplicationId,
        responses: questions
          .filter((question) => answers[question.key] !== undefined)
          .map((question) => ({
            questionId: question.id,
            value: String(answers[question.key]),
          })),
      })

      setSubmitMessage(
        `Application ${targetApplicationId} submitted successfully.`,
      )
    } catch {
      setSubmitMessage('Unable to finalize application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    submitMessage,
    applicationId,
    submitLoanDetails,
    uploadEsgDocument,
    verifyEsgDocument,
    finalizeApplication,
  }
}
