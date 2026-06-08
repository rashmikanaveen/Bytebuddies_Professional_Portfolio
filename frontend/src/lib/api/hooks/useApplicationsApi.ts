import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { createApplicationMock } from '@/lib/api/mock/providers'
import type {
  ApiApplicationCreatePayload,
  ApiApplicationCreateResult,
  ApiApplicationRecord,
} from '@/lib/api/types'

export function useApplicationsApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createApplication = useCallback(
    async (
      payload: ApiApplicationCreatePayload,
    ): Promise<ApiApplicationCreateResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await createApplicationMock(payload)
        }

        return await requestJson<ApiApplicationCreateResult>('/applications/', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch (caught) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'Failed to create application'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const listApplications = useCallback(async (): Promise<ApiApplicationRecord[]> => {
    setLoading(true)
    setError(null)
    try {
      return await requestJson<ApiApplicationRecord[]>('/applications/')
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to load applications'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, createApplication, listApplications }
}
