import { useQuestionResponsesApi } from '@/lib/api/hooks/useQuestionResponsesApi'

export function useResponsesApi() {
  const { loading, error, submitResponses, getResponses } =
    useQuestionResponsesApi()

  return {
    loading,
    error,
    submitResponses,
    getResponses,
  }
}
