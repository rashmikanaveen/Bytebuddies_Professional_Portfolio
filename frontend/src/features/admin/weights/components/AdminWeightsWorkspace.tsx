import ConsistencyPanel from '@/features/admin/weights/components/ConsistencyPanel'
import MatrixEditor from '@/features/admin/weights/components/MatrixEditor'
import SectorSelector from '@/features/admin/weights/components/SectorSelector'
import { useWeightsEditor } from '@/features/admin/weights/hooks/useWeightsEditor'

function AdminWeightsWorkspace() {
  const { selectedSector, setSelectedSector, activeMatrix, updateCell } =
    useWeightsEditor()

  return (
    <section className="admin-weights-layout">
      <article className="surface-card">
        <h2>Admin AHP Matrix Management</h2>
        <p>
          Update active comparison matrix values by sector and submit adjusted
          weights for scoring workflows.
        </p>
      </article>

      <SectorSelector value={selectedSector} onChange={setSelectedSector} />
      <MatrixEditor matrix={activeMatrix} onCellUpdate={updateCell} />
      <ConsistencyPanel consistencyRatio={activeMatrix.consistencyRatio} />
    </section>
  )
}

export default AdminWeightsWorkspace
