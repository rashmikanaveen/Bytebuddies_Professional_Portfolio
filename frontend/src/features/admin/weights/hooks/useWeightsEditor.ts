import { useMemo, useState } from 'react'
import { sectorMatrices } from '@/features/admin/weights/mock/matrixData'
import type { SectorKey } from '@/features/admin/weights/types'

export function useWeightsEditor() {
  const [selectedSector, setSelectedSector] =
    useState<SectorKey>('MANUFACTURING')
  const [matrices, setMatrices] = useState(sectorMatrices)

  const activeMatrix = useMemo(
    () =>
      matrices.find((matrix) => matrix.sector === selectedSector) ??
      matrices[0],
    [matrices, selectedSector],
  )

  function updateCell(key: string, value: number) {
    setMatrices((prev) =>
      prev.map((matrix) => {
        if (matrix.sector !== selectedSector) {
          return matrix
        }

        return {
          ...matrix,
          cells: matrix.cells.map((cell) =>
            cell.key === key ? { ...cell, value } : cell,
          ),
        }
      }),
    )
  }

  return {
    selectedSector,
    setSelectedSector,
    activeMatrix,
    updateCell,
  }
}
