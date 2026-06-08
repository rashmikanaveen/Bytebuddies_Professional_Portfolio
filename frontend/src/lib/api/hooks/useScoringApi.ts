import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import { getScoreMock } from '@/lib/api/mock/providers'
import type { ApiScoreResult } from '@/lib/api/types'

export function useScoringApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateScore = useCallback(async (applicationId: string) => {
    setLoading(true)
    setError(null)
    try {
      if (API_MODE === 'mock') {
        return await getScoreMock()
      }

      return await requestJson<ApiScoreResult>(
        `/score/calculate/${applicationId}`,
        {
          method: 'POST',
        },
      )
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : 'Failed to calculate score'
      setError(message)
      throw caught
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, calculateScore }
}
