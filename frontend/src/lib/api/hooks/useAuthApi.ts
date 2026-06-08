import { useCallback, useState } from 'react'
import { API_MODE } from '@/lib/api/config'
import { requestJson } from '@/lib/api/client'
import api from '@/services/api'
import { registerMock } from '@/lib/api/mock/providers'
import type {
  ApiLoginPayload,
  ApiLoginResult,
  ApiRegisterPayload,
  ApiRegisterResult,
} from '@/lib/api/types'

export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (payload: ApiLoginPayload): Promise<ApiLoginResult> => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.post<ApiLoginResult>('/auth/login', payload)
        return response.data
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

  const register = useCallback(
    async (payload: ApiRegisterPayload): Promise<ApiRegisterResult> => {
      setLoading(true)
      setError(null)
      try {
        if (API_MODE === 'mock') {
          return await registerMock(payload)
        }

        return await requestJson<ApiRegisterResult>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to register'
        setError(message)
        throw caught
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, error, login, register }
}
