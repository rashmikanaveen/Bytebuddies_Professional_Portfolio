export type SectorKey = 'MANUFACTURING' | 'SERVICES' | 'AGRICULTURE' | 'FINANCE'

export type MatrixCell = {
  key: string
  leftLabel: string
  rightLabel: string
  value: number
}

export type SectorMatrix = {
  sector: SectorKey
  consistencyRatio: number
  cells: MatrixCell[]
}
