import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

type AppSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean
}

function AppSelect({
  className = '',
  error = false,
  children,
  ...props
}: AppSelectProps) {
  return (
    <div
      className={
        error ? 'app-select-wrap app-select-wrap-error' : 'app-select-wrap'
      }
    >
      <select className={`app-select ${className}`.trim()} {...props}>
        {children}
      </select>
      <ChevronDown size={16} className="app-select-icon" aria-hidden="true" />
    </div>
  )
}

export default AppSelect
