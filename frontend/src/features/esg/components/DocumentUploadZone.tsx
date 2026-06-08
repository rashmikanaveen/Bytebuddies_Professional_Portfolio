import { useRef, useState } from 'react'

type DocumentUploadZoneProps = {
  onFilesSelected: (fileList: FileList | null) => void
}

function DocumentUploadZone({ onFilesSelected }: DocumentUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div
      className={`upload-dropzone ${isDragging ? 'upload-dropzone-active' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        onFilesSelected(event.dataTransfer.files)
      }}
    >
      <p className="upload-title">Drop ESG files here</p>
      <p className="upload-copy">Accepts PDF, JPG, JPEG, PNG up to 10MB.</p>
      <button
        type="button"
        className="secondary-btn"
        onClick={() => inputRef.current?.click()}
      >
        Browse Files
      </button>
      <input
        ref={inputRef}
        type="file"
        className="sr-only-input"
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        onChange={(event) => onFilesSelected(event.target.files)}
      />
    </div>
  )
}

export default DocumentUploadZone
