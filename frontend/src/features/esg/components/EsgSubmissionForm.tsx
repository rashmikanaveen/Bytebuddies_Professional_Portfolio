import DocumentUploadZone from '@/features/esg/components/DocumentUploadZone'
import EsgInputSection from '@/features/esg/components/EsgInputSection'
import UploadedFileList from '@/features/esg/components/UploadedFileList'
import { useDocumentUpload } from '@/features/esg/hooks/useDocumentUpload'
import { esgMetricFields } from '@/features/esg/mock/metricConfig'

type EsgSubmissionFormProps = {
  submissionId: string
}

function EsgSubmissionForm({ submissionId }: EsgSubmissionFormProps) {
  const { queue, summary, addFiles, removeFile } = useDocumentUpload()

  return (
    <section className="esg-submission-layout">
      <article className="surface-card">
        <h2>Submission Context</h2>
        <p>Submission ID: {submissionId}</p>
        <p className="dashboard-list-meta">
          Uploaded: {summary.uploaded} / {summary.total} · Failed:{' '}
          {summary.failed}
        </p>
      </article>

      <EsgInputSection
        section="environmental"
        title="Environmental Inputs"
        fields={esgMetricFields}
      />
      <EsgInputSection
        section="social"
        title="Social Inputs"
        fields={esgMetricFields}
      />
      <EsgInputSection
        section="governance"
        title="Governance Inputs"
        fields={esgMetricFields}
      />

      <article className="surface-card">
        <h2>Document Upload</h2>
        <DocumentUploadZone onFilesSelected={addFiles} />
        <UploadedFileList queue={queue} onRemove={removeFile} />
      </article>
    </section>
  )
}

export default EsgSubmissionForm
