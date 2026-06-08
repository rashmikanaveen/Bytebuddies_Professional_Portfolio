import type { UploadQueueItem } from '@/features/esg/types'

type UploadedFileListProps = {
  queue: UploadQueueItem[]
  onRemove: (itemId: string) => void
}

function UploadedFileList({ queue, onRemove }: UploadedFileListProps) {
  if (!queue.length) {
    return <p className="upload-copy">No files uploaded yet.</p>
  }

  return (
    <ul className="upload-list">
      {queue.map((item) => (
        <li key={item.id} className="upload-list-row">
          <div>
            <p className="dashboard-list-title">{item.file.name}</p>
            <p className="dashboard-list-meta">{item.message}</p>
          </div>
          <div className="upload-list-actions">
            <span className={`upload-status upload-status-${item.status}`}>
              {item.status}
            </span>
            <button
              type="button"
              className="table-link-btn"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default UploadedFileList
