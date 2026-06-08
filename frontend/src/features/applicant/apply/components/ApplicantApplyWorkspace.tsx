import { useMemo, useState } from 'react'
import { ShieldCheck, Upload } from 'lucide-react'
import ApplicantQuestionField from '@/features/applicant/apply/components/ApplicantQuestionField'
import { useApplicantQuestions } from '@/features/applicant/apply/api/useApplicantQuestions'
import { useApplicantSubmission } from '@/features/applicant/apply/api/useApplicantSubmission'
import type { ApplicantAnswerValue } from '@/features/applicant/apply/types'

type ProofStatus = {
  fileName?: string
  uploaded?: boolean
  verified?: boolean
  message?: string
}

function ApplicantApplyWorkspace() {
  const { loading, error, sections, questions } = useApplicantQuestions()
  const {
    submitting,
    submitMessage,
    applicationId,
    submitLoanDetails,
    uploadEsgDocument,
    verifyEsgDocument,
    finalizeApplication,
  } = useApplicantSubmission()
  const [answers, setAnswers] = useState<Record<string, ApplicantAnswerValue>>(
    {},
  )
  const [proofFiles, setProofFiles] = useState<Record<string, File | null>>({})
  const [proofStatuses, setProofStatuses] = useState<Record<string, ProofStatus>>(
    {},
  )
  const [activeProofKey, setActiveProofKey] = useState<string | null>(null)

  const hasRequiredMissing = useMemo(
    () =>
      questions.some(
        (question) =>
          question.required &&
          (answers[question.key] === undefined || answers[question.key] === ''),
      ),
    [answers, questions],
  )

  async function getOrCreateApplicationId() {
    if (applicationId) {
      return applicationId
    }

    return await submitLoanDetails(answers)
  }

  async function handleProofUpload(questionKey: string) {
    const file = proofFiles[questionKey]
    if (!file) {
      setProofStatuses((prev) => ({
        ...prev,
        [questionKey]: { message: 'Choose a proof document first.' },
      }))
      return
    }

    setActiveProofKey(questionKey)
    try {
      const targetApplicationId = await getOrCreateApplicationId()
      if (!targetApplicationId) {
        setProofStatuses((prev) => ({
          ...prev,
          [questionKey]: {
            fileName: file.name,
            message: 'Complete loan details before uploading proof.',
          },
        }))
        return
      }

      await uploadEsgDocument(file, targetApplicationId)
      setProofStatuses((prev) => ({
        ...prev,
        [questionKey]: {
          fileName: file.name,
          uploaded: true,
          verified: false,
          message: 'Proof uploaded. Ready to verify.',
        },
      }))
    } catch {
      setProofStatuses((prev) => ({
        ...prev,
        [questionKey]: {
          fileName: file.name,
          message: 'Upload failed. Please try again.',
        },
      }))
    } finally {
      setActiveProofKey(null)
    }
  }

  async function handleProofVerify(questionKey: string) {
    setActiveProofKey(questionKey)
    try {
      const targetApplicationId = await getOrCreateApplicationId()
      if (!targetApplicationId) {
        setProofStatuses((prev) => ({
          ...prev,
          [questionKey]: {
            ...prev[questionKey],
            message: 'Complete loan details before verification.',
          },
        }))
        return
      }

      const result = await verifyEsgDocument(targetApplicationId)
      setProofStatuses((prev) => ({
        ...prev,
        [questionKey]: {
          ...prev[questionKey],
          verified: result.status === 'SYSTEM_VERIFIED',
          message: result.message,
        },
      }))
    } catch {
      setProofStatuses((prev) => ({
        ...prev,
        [questionKey]: {
          ...prev[questionKey],
          message: 'Verification failed. Please try again.',
        },
      }))
    } finally {
      setActiveProofKey(null)
    }
  }

  return (
    <section className="surface-card">
      <h2>New Loan Application</h2>
      <p>
        Questions below define which loan and ESG fields are required for this
        application flow. Current mode uses mock API hooks and frontend data.
      </p>

      {loading ? <p>Loading form questions...</p> : null}
      {error ? <p className="login-error">{error}</p> : null}

      <form
        className="applicant-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (!hasRequiredMissing) {
            void (async () => {
              const targetApplicationId = await getOrCreateApplicationId()
              if (targetApplicationId) {
                await finalizeApplication(questions, answers, targetApplicationId)
              }
            })()
          }
        }}
      >
        {sections.map((section) => (
          <article
            key={section.key}
            className={`surface-card applicant-question-section applicant-section-${section.key} ${
              section.key === 'LOAN' ? 'loan-details-section' : ''
            }`}
          >
            <h3>{section.title}</h3>
            {section.questions.map((question) => (
              <ApplicantQuestionField
                key={question.key}
                question={question}
                value={answers[question.key]}
                onChange={(value) =>
                  setAnswers((prev) => ({ ...prev, [question.key]: value }))
                }
                proofControls={
                  question.category === 'E' ||
                  question.category === 'S' ||
                  question.category === 'G' ? (
                    <div className="question-proof-panel">
                      <input
                        id={`${question.key}-proof`}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) =>
                          setProofFiles((prev) => ({
                            ...prev,
                            [question.key]: event.target.files?.[0] ?? null,
                          }))
                        }
                      />
                      <div className="question-proof-actions">
                        <button
                          type="button"
                          className="secondary-btn question-proof-btn"
                          disabled={activeProofKey === question.key}
                          onClick={() => void handleProofUpload(question.key)}
                        >
                          <Upload size={16} aria-hidden="true" />
                          Upload
                        </button>
                        <button
                          type="button"
                          className="primary-btn question-proof-btn"
                          disabled={
                            activeProofKey === question.key ||
                            !proofStatuses[question.key]?.uploaded
                          }
                          onClick={() => void handleProofVerify(question.key)}
                        >
                          <ShieldCheck size={16} aria-hidden="true" />
                          Verify
                        </button>
                      </div>
                      {proofStatuses[question.key]?.message ? (
                        <p className="dashboard-list-meta">
                          {proofStatuses[question.key]?.message}
                        </p>
                      ) : null}
                    </div>
                  ) : null
                }
              />
            ))}
          </article>
        ))}

        {hasRequiredMissing ? (
          <p className="login-error">
            Please fill all required fields before submit.
          </p>
        ) : null}

        {submitMessage ? <p>{submitMessage}</p> : null}

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
  )
}

export default ApplicantApplyWorkspace
