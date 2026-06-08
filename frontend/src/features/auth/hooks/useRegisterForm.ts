import { useMemo, useState } from 'react'
import type {
  RegisterFormErrors,
  RegisterFormValues,
} from '@/features/auth/types'
import { validateRegisterForm } from '@/features/auth/validation/registerSchema'

type UseRegisterFormOptions = {
  onSuccess: (values: RegisterFormValues) => void
}

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  role: 'applicant',
  profileImageUrl: '',
}

export function useRegisterForm({ onSuccess }: UseRegisterFormOptions) {
  const [values, setValues] = useState<RegisterFormValues>(initialValues)
  const [errors, setErrors] = useState<RegisterFormErrors>({})

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  function updateField<K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function submit() {
    const validationErrors = validateRegisterForm(values)
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
