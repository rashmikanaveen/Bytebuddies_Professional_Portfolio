import type { ApiMode } from '@/lib/api/types'

const rawMode = import.meta.env.VITE_API_MODE

export const API_MODE: ApiMode = rawMode === 'real' ? 'real' : 'mock'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'
