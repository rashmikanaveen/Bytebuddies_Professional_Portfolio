import { useMemo, useState } from 'react'
import type { LoginFormErrors, LoginFormValues } from '@/features/auth/types'
import { validateLoginForm } from '@/features/auth/validation/loginSchema'

type UseLoginFormOptions = {
  onSuccess: (values: LoginFormValues) => void
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  role: 'loan_officer',
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions) {
  const [values, setValues] = useState<LoginFormValues>(initialValues)
  const [errors, setErrors] = useState<LoginFormErrors>({})

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  function updateField<K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function submit() {
    const validationErrors = validateLoginForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSuccess(values)
    }
  }

  return {
    values,
    errors,
    isValid,
    updateField,
    submit,
  }
}
