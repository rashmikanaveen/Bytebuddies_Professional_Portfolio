import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import {
  getQuestionResponsesMock,
  submitQuestionResponsesMock,
} from '@/lib/api/mock/providers'
import type {
  ApiQuestionResponsePayload,
  ApiQuestionResponseResult,
} from '@/lib/api/types'

export function useQuestionResponsesApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitResponses = useCallback(
    async (
      payload: ApiQuestionResponsePayload,
    ): Promise<ApiQuestionResponseResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await submitQuestionResponsesMock(payload)
        }

        return await requestJson<ApiQuestionResponseResult>('/responses/', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch (caught) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'Failed to submit responses'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const getResponses = useCallback(async (applicationId: string) => {
    setLoading(true)
    setError(null)
    try {
      if (API_MODE === 'mock') {
        return await getQuestionResponsesMock(applicationId)
      }

      return await requestJson<{
        applicationId: string
        responses: Array<{ questionId: number; value: string }>
      }>(`/responses/${applicationId}`)
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to fetch responses'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    submitResponses,
    getResponses,
  }
}
