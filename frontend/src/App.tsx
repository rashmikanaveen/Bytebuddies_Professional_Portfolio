import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import AdminWeightsPage from './pages/AdminWeightsPage'
import ApplicantApplyPage from './pages/ApplicantApplyPage'
import ApplicantScorePage from './pages/ApplicantScorePage'
import ApplicantStatusPage from './pages/ApplicantStatusPage'
import DashboardPage from './pages/DashboardPage'
import EsgSubmissionPage from './pages/EsgSubmissionPage'
import LoanDetailPage from './pages/LoanDetailPage'
import LoansPage from './pages/LoansPage'
import LoginPage from './pages/LoginPage'
import ReportsPage from './pages/ReportsPage'
import ScoreResultPage from './pages/ScoreResultPage'
import ScoringPage from './pages/ScoringPage'
import VerificationPanelPage from './pages/VerificationPanelPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/officer" element={<BaseLayout role="officer" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="loans/:loanId" element={<LoanDetailPage />} />
        <Route path="scoring" element={<ScoringPage />} />
        <Route
          path="scoring/submissions/:submissionId/esg"
          element={<EsgSubmissionPage />}
        />
        <Route
          path="scoring/submissions/:submissionId/verification"
          element={<VerificationPanelPage />}
        />
        <Route
          path="scoring/submissions/:submissionId/result"
          element={<ScoreResultPage />}
        />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="admin/weights" element={<AdminWeightsPage />} />
      </Route>

      <Route path="/applicant" element={<BaseLayout role="applicant" />}>
        <Route index element={<Navigate to="status" replace />} />
        <Route path="apply" element={<ApplicantApplyPage />} />
        <Route path="status" element={<ApplicantStatusPage />} />
        <Route path="score" element={<ApplicantScorePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
