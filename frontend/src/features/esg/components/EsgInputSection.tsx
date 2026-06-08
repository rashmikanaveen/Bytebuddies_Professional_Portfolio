import type { EsgMetricField, EsgSectionKey } from '@/features/esg/types'

type EsgInputSectionProps = {
  section: EsgSectionKey
  title: string
  fields: EsgMetricField[]
}

function EsgInputSection({ section, title, fields }: EsgInputSectionProps) {
  return (
    <article className="surface-card">
      <h2>{title}</h2>
      <div className="esg-field-grid">
        {fields
          .filter((field) => field.section === section)
          .map((field) => (
            <div key={field.key} className="form-row">
              <label htmlFor={field.key}>{field.label}</label>
              <input id={field.key} type="number" placeholder="Enter value" />
              <p className="dashboard-list-meta">
                Required document: {field.requiredDocumentLabel}
              </p>
            </div>
          ))}
      </div>
    </article>
  )
}

export default EsgInputSection
