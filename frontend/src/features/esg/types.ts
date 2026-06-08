export type EsgSectionKey = 'environmental' | 'social' | 'governance'

export type EsgMetricField = {
  key: string
  label: string
  section: EsgSectionKey
  requiredDocumentLabel: string
}

export type UploadStatus = 'ready' | 'uploading' | 'uploaded' | 'failed'

export type UploadQueueItem = {
  id: string
  file: File
  status: UploadStatus
  message?: string
}
