import type { SectorMatrix } from '@/features/admin/weights/types'

type MatrixEditorProps = {
  matrix: SectorMatrix
  onCellUpdate: (key: string, value: number) => void
}

function MatrixEditor({ matrix, onCellUpdate }: MatrixEditorProps) {
  return (
    <article className="surface-card">
      <h2>Pillar Pairwise Matrix</h2>
      <div className="status-table-wrap">
        <table className="status-table">
          <thead>
            <tr>
              <th>Comparison</th>
              <th>Relative Weight Value</th>
            </tr>
          </thead>
          <tbody>
            {matrix.cells.map((cell) => (
              <tr key={cell.key}>
                <td>
                  {cell.leftLabel} vs {cell.rightLabel}
                </td>
                <td>
                  <input
                    className="loan-filter-input"
                    type="number"
                    min={1}
                    max={9}
                    step={1}
                    value={cell.value}
                    onChange={(event) =>
                      onCellUpdate(cell.key, Number(event.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default MatrixEditor
