import { useMemo, useState } from 'react'

export type VerificationDecision =
  | 'UNSET'
  | 'VERIFIED'
  | 'REJECTED'
  | 'CANNOT_VERIFY'

export function useVerificationState(fieldKeys: string[]) {
  const [decisions, setDecisions] = useState<
    Record<string, VerificationDecision>
  >(Object.fromEntries(fieldKeys.map((fieldKey) => [fieldKey, 'UNSET'])))

  function setDecision(fieldKey: string, decision: VerificationDecision) {
    setDecisions((prev) => ({ ...prev, [fieldKey]: decision }))
  }

  const summary = useMemo(() => {
    const values = Object.values(decisions)

    return {
      unresolved: values.filter((value) => value === 'UNSET').length,
      verified: values.filter((value) => value === 'VERIFIED').length,
      rejected: values.filter((value) => value === 'REJECTED').length,
      cannotVerify: values.filter((value) => value === 'CANNOT_VERIFY').length,
    }
  }, [decisions])

  return { decisions, setDecision, summary }
}
