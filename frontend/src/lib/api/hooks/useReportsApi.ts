import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { getReportsMock } from '@/lib/api/mock/providers'
import type { ApiReportResult } from '@/lib/api/types'

export function useReportsApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getReports = useCallback(async (): Promise<ApiReportResult[]> => {
    setLoading(true)
    setError(null)
    try {
      if (API_MODE === 'mock') {
        return await getReportsMock()
      }

      return await requestJson<ApiReportResult[]>('/reports')
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to fetch reports'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, getReports }
}
