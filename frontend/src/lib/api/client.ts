import { API_BASE_URL } from '@/lib/api/config'
import type { ApiError } from '@/lib/api/types'

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    let message = response.statusText
    try {
      const payload = (await response.json()) as { detail?: string }
      message = payload.detail ?? message
    } catch {
      // no-op: fallback to status text
    }

    const error: ApiError = { message, status: response.status }
    throw error
  }

  return (await response.json()) as T
}
