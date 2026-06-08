import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { getAdminWeightsMock } from '@/lib/api/mock/providers'
import type { ApiWeightsResult } from '@/lib/api/types'

export function useAdminWeightsApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWeights = useCallback(async (): Promise<ApiWeightsResult[]> => {
    setLoading(true)
    setError(null)
    try {
      if (API_MODE === 'mock') {
        return await getAdminWeightsMock()
      }

      return await requestJson<ApiWeightsResult[]>('/admin/ahp-matrices')
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to fetch weights'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, getWeights }
}
