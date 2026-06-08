import { useMemo, useState } from 'react'
import ApplicantQuestionField from '@/features/applicant/apply/components/ApplicantQuestionField'
import { useApplicantQuestions } from '@/features/applicant/apply/api/useApplicantQuestions'
import { useApplicantSubmission } from '@/features/applicant/apply/api/useApplicantSubmission'
import type { ApplicantAnswerValue } from '@/features/applicant/apply/types'

function ApplicantApplyWorkspace() {
  const { loading, error, sections, questions } = useApplicantQuestions()
  const { submitting, submitMessage, submitApplication } =
    useApplicantSubmission()
  const [answers, setAnswers] = useState<Record<string, ApplicantAnswerValue>>(
    {},
  )
  const [files, setFiles] = useState<File[]>([])

  const hasRequiredMissing = useMemo(
    () =>
      questions.some(
        (question) =>
          question.required &&
          (answers[question.key] === undefined || answers[question.key] === ''),
      ),
    [answers, questions],
  )

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
            void submitApplication(questions, answers, files)
          }
        }}
      >
        {sections.map((section) => (
          <article
            key={section.key}
            className="surface-card applicant-question-section"
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
              />
            ))}
          </article>
        ))}

        <div className="form-row">
          <label htmlFor="supporting-files">
            Supporting Reports / Documents
          </label>
          <input
            id="supporting-files"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          />
        </div>

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
