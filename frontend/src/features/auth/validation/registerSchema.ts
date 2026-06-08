import type {
  RegisterFormErrors,
  RegisterFormValues,
} from '@/features/auth/types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRegisterForm(
  values: RegisterFormValues,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (!values.role) {
    errors.role = 'Select a role to continue.'
  }

  if (values.profileImageUrl && !values.profileImageUrl.startsWith('http')) {
    errors.profileImageUrl =
      'Profile image URL should start with http or https.'
  }

  return errors
}
