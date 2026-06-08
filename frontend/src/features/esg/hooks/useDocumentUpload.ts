import { useMemo, useState } from 'react'
import type { UploadQueueItem } from '@/features/esg/types'

const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']
const maxFileSizeInBytes = 10 * 1024 * 1024

function getFileExtension(fileName: string) {
  const parts = fileName.split('.')
  return parts[parts.length - 1]?.toLowerCase() ?? ''
}

function createQueueItem(file: File): UploadQueueItem {
  const extension = getFileExtension(file.name)

  if (!allowedExtensions.includes(extension)) {
    return {
      id: `${file.name}-${file.lastModified}`,
      file,
      status: 'failed',
      message: 'Unsupported file format.',
    }
  }

  if (file.size > maxFileSizeInBytes) {
    return {
      id: `${file.name}-${file.lastModified}`,
      file,
      status: 'failed',
      message: 'File exceeds 10MB limit.',
    }
  }

  return {
    id: `${file.name}-${file.lastModified}`,
    file,
    status: 'uploaded',
    message: 'Uploaded successfully.',
  }
}

export function useDocumentUpload() {
  const [queue, setQueue] = useState<UploadQueueItem[]>([])

  function addFiles(fileList: FileList | null) {
    if (!fileList) {
      return
    }

    const nextItems = Array.from(fileList).map(createQueueItem)
    setQueue((prev) => [...prev, ...nextItems])
  }

  function removeFile(itemId: string) {
    setQueue((prev) => prev.filter((item) => item.id !== itemId))
  }

  const summary = useMemo(() => {
    const uploaded = queue.filter((item) => item.status === 'uploaded').length
    const failed = queue.filter((item) => item.status === 'failed').length

    return { uploaded, failed, total: queue.length }
  }, [queue])

  return {
    queue,
    summary,
    addFiles,
    removeFile,
  }
}
