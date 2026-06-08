import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { uploadDocumentMock, verifyDocumentMock } from '@/lib/api/mock/providers'
import type {
  ApiDocumentUploadResult,
  ApiDocumentVerificationResult,
} from '@/lib/api/types'

export function useDocumentsApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadDocument = useCallback(
    async (
      applicationId: string,
      file: File,
    ): Promise<ApiDocumentUploadResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await uploadDocumentMock(file)
        }

        const formData = new FormData()
        formData.append('file', file)

        return await requestJson<ApiDocumentUploadResult>(
          `/documents/upload/${applicationId}`,
          {
            method: 'POST',
            body: formData,
            headers: {},
          },
        )
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to upload document'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const verifyDocument = useCallback(
    async (applicationId: string): Promise<ApiDocumentVerificationResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await verifyDocumentMock(applicationId)
        }

        const result = await requestJson<{
          application_id: number | string
          confidence_score: number
          status: ApiDocumentVerificationResult['status']
          message: string
        }>(`/documents/verify/${applicationId}`, {
          method: 'POST',
        })

        return {
          applicationId: String(result.application_id),
          confidenceScore: result.confidence_score,
          status: result.status,
          message: result.message,
        }
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to verify document'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, error, uploadDocument, verifyDocument }
}
