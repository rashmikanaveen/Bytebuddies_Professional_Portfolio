import { API_BASE_URL } from '@/lib/api/config'
import type { ApiError } from '@/lib/api/types'

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string') {
    return payload
  }

  if (Array.isArray(payload)) {
    return payload
      .map((item) => {
        if (
          item &&
          typeof item === 'object' &&
          'msg' in item &&
          typeof item.msg === 'string'
        ) {
          return item.msg
        }

        return fallback
      })
      .join(', ')
  }

  if (payload && typeof payload === 'object' && 'detail' in payload) {
    return extractErrorMessage(payload.detail, fallback)
  }

  return fallback
}

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
      const payload = await response.json()
      message = extractErrorMessage(payload, message)
    } catch {
      // no-op: fallback to status text
    }

    const error: ApiError = { message, status: response.status }
    throw error
  }

  return (await response.json()) as T
}
