import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'

type LoginPayload = { email: string; password: string }

type LoginResult = { access_token: string; token_type: string }

export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (payload: LoginPayload): Promise<LoginResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return { access_token: 'mock-token', token_type: 'bearer' }
        }

        return await requestJson<LoginResult>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to login'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, error, login }
}
