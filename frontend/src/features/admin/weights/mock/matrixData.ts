import type { SectorMatrix } from '@/features/admin/weights/types'

export const sectorMatrices: SectorMatrix[] = [
  {
    sector: 'MANUFACTURING',
    consistencyRatio: 0.08,
    cells: [
      {
        key: 'e_vs_s',
        leftLabel: 'Environmental',
        rightLabel: 'Social',
        value: 3,
      },
      {
        key: 'e_vs_g',
        leftLabel: 'Environmental',
        rightLabel: 'Governance',
        value: 2,
      },
      {
        key: 's_vs_g',
        leftLabel: 'Social',
        rightLabel: 'Governance',
        value: 1,
      },
    ],
  },
  {
    sector: 'SERVICES',
    consistencyRatio: 0.07,
    cells: [
      {
        key: 'e_vs_s',
        leftLabel: 'Environmental',
        rightLabel: 'Social',
        value: 2,
      },
      {
        key: 'e_vs_g',
        leftLabel: 'Environmental',
        rightLabel: 'Governance',
        value: 2,
      },
      {
        key: 's_vs_g',
        leftLabel: 'Social',
        rightLabel: 'Governance',
        value: 2,
      },
    ],
  },
  {
    sector: 'AGRICULTURE',
    consistencyRatio: 0.09,
    cells: [
      {
        key: 'e_vs_s',
        leftLabel: 'Environmental',
        rightLabel: 'Social',
        value: 4,
      },
      {
        key: 'e_vs_g',
        leftLabel: 'Environmental',
        rightLabel: 'Governance',
        value: 3,
      },
      {
        key: 's_vs_g',
        leftLabel: 'Social',
        rightLabel: 'Governance',
        value: 2,
      },
    ],
  },
  {
    sector: 'FINANCE',
    consistencyRatio: 0.06,
    cells: [
      {
        key: 'e_vs_s',
        leftLabel: 'Environmental',
        rightLabel: 'Social',
        value: 2,
      },
      {
        key: 'e_vs_g',
        leftLabel: 'Environmental',
        rightLabel: 'Governance',
        value: 1,
      },
      {
        key: 's_vs_g',
        leftLabel: 'Social',
        rightLabel: 'Governance',
        value: 2,
      },
    ],
  },
]
