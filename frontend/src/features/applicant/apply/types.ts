import type { ApiQuestion } from '@/lib/api/types'

export type ApplicantAnswerValue = string | number | boolean

export type ApplicantQuestion = ApiQuestion

export type ApplicantQuestionSection = {
  key: 'LOAN' | 'E' | 'S' | 'G'
  title: string
  questions: ApplicantQuestion[]
}
