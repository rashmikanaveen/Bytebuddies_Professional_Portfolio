import type { UserRole } from '@/features/auth/types'

type RoleSelectorProps = {
  value: UserRole
  error?: string
  onChange: (value: UserRole) => void
}

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: 'loan_officer', label: 'Loan Officer' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
  { value: 'applicant', label: 'Applicant User' },
]

function RoleSelector({ value, error, onChange }: RoleSelectorProps) {
  return (
    <div className="login-form-row">
      <label htmlFor="role">Role</label>
      <select
        id="role"
        className={`login-input ${error ? 'login-input-error' : ''}`}
        value={value}
        onChange={(event) => onChange(event.target.value as UserRole)}
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="login-error">{error}</p> : null}
    </div>
  )
}

export default RoleSelector
