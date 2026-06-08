import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { createQuestionMock, listQuestionsMock } from '@/lib/api/mock/providers'
import type { ApiCreateQuestionPayload, ApiQuestion } from '@/lib/api/types'

export function useQuestionsApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getQuestions = useCallback(async (): Promise<ApiQuestion[]> => {
    setLoading(true)
    setError(null)
    try {
      if (API_MODE === 'mock') {
        return await listQuestionsMock()
      }

      return await requestJson<ApiQuestion[]>('/questions/')
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to load questions'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  const createQuestion = useCallback(
    async (payload: ApiCreateQuestionPayload): Promise<ApiQuestion> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await createQuestionMock(payload)
        }

        return await requestJson<ApiQuestion>('/questions/', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to create question'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    error,
    getQuestions,
    createQuestion,
  }
}
