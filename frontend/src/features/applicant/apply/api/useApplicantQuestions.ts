import { useEffect, useMemo, useState } from 'react'
import { useQuestionsApi } from '@/lib/api/hooks'
import type {
  ApplicantQuestion,
  ApplicantQuestionSection,
} from '@/features/applicant/apply/types'

const sectionTitleMap: Record<'LOAN' | 'E' | 'S' | 'G', string> = {
  LOAN: 'Loan Application Details',
  E: 'Environmental Inputs',
  S: 'Social Inputs',
  G: 'Governance Inputs',
}

export function useApplicantQuestions() {
  const { loading, error, getQuestions } = useQuestionsApi()
  const [questions, setQuestions] = useState<ApplicantQuestion[]>([])

  useEffect(() => {
    void getQuestions().then((items) => setQuestions(items))
  }, [getQuestions])

  const sections = useMemo<ApplicantQuestionSection[]>(() => {
    const keys: Array<'LOAN' | 'E' | 'S' | 'G'> = ['LOAN', 'E', 'S', 'G']

    return keys
      .map((key) => {
        const sectionQuestions = questions.filter(
          (question) => question.category === key,
        )
        return {
          key,
          title: sectionTitleMap[key],
          questions: sectionQuestions,
        }
      })
      .filter((section) => section.questions.length > 0)
  }, [questions])

  return {
    loading,
    error,
    questions,
    sections,
  }
}
