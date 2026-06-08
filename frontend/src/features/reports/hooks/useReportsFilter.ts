import { useMemo, useState } from 'react'
import { reportRecords } from '@/features/reports/mock/reportsData'

export function useReportsFilter() {
  const [startDate, setStartDate] = useState('2026-06-01')
  const [endDate, setEndDate] = useState('2026-06-30')

  const filtered = useMemo(
    () =>
      reportRecords.filter(
        (record) =>
          record.generatedAt >= startDate && record.generatedAt <= endDate,
      ),
    [endDate, startDate],
  )

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filtered,
  }
}
