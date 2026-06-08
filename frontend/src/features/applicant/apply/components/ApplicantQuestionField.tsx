import type {
  ApplicantAnswerValue,
  ApplicantQuestion,
} from '@/features/applicant/apply/types'

type ApplicantQuestionFieldProps = {
  question: ApplicantQuestion
  value: ApplicantAnswerValue | undefined
  onChange: (value: ApplicantAnswerValue) => void
}

function ApplicantQuestionField({
  question,
  value,
  onChange,
}: ApplicantQuestionFieldProps) {
  if (question.fieldType === 'textarea') {
    return (
      <div className="form-row" key={question.key}>
        <label htmlFor={question.key}>{question.label}</label>
        <textarea
          id={question.key}
          rows={4}
          placeholder={question.placeholder}
          value={String(value ?? '')}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    )
  }

  if (question.fieldType === 'select') {
    return (
      <div className="form-row" key={question.key}>
        <label htmlFor={question.key}>{question.label}</label>
        <select
          id={question.key}
          className="loan-filter-input"
          value={String(value ?? '')}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Select an option</option>
          {(question.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (question.fieldType === 'boolean') {
    return (
      <div className="form-row" key={question.key}>
        <label htmlFor={question.key}>{question.label}</label>
        <input
          id={question.key}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
      </div>
    )
  }

  return (
    <div className="form-row" key={question.key}>
      <label htmlFor={question.key}>{question.label}</label>
      <input
        id={question.key}
        type={question.fieldType === 'number' ? 'number' : 'text'}
        placeholder={question.placeholder}
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      />
      {question.helpText ? (
        <p className="dashboard-list-meta">{question.helpText}</p>
      ) : null}
    </div>
  )
}

export default ApplicantQuestionField
