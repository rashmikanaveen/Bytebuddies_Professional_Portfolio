import type { SectorKey } from '@/features/admin/weights/types'

type SectorSelectorProps = {
  value: SectorKey
  onChange: (value: SectorKey) => void
}

const sectorOptions: SectorKey[] = [
  'MANUFACTURING',
  'SERVICES',
  'AGRICULTURE',
  'FINANCE',
]

function SectorSelector({ value, onChange }: SectorSelectorProps) {
  return (
    <article className="surface-card">
      <h2>Sector</h2>
      <div className="admin-sector-grid">
        {sectorOptions.map((sector) => (
          <button
            key={sector}
            type="button"
            className={
              value === sector
                ? 'decision-btn decision-btn-active'
                : 'decision-btn'
            }
            onClick={() => onChange(sector)}
          >
            {sector}
          </button>
        ))}
      </div>
    </article>
  )
}

export default SectorSelector
