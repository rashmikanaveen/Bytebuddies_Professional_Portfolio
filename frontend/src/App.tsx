import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import RequireRole from './components/routing/RequireRole'
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

      <Route
        path="/officer"
        element={
          <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
            <BaseLayout role="officer" />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <DashboardPage />
            </RequireRole>
          }
        />
        <Route
          path="loans"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <LoansPage />
            </RequireRole>
          }
        />
        <Route
          path="loans/:loanId"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <LoanDetailPage />
            </RequireRole>
          }
        />
        <Route
          path="scoring"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <ScoringPage />
            </RequireRole>
          }
        />
        <Route
          path="scoring/submissions/:submissionId/esg"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <EsgSubmissionPage />
            </RequireRole>
          }
        />
        <Route
          path="scoring/submissions/:submissionId/verification"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <VerificationPanelPage />
            </RequireRole>
          }
        />
        <Route
          path="scoring/submissions/:submissionId/result"
          element={
            <RequireRole allowedRoles={['loan_officer', 'manager', 'admin']}>
              <ScoreResultPage />
            </RequireRole>
          }
        />
        <Route
          path="reports"
          element={
            <RequireRole allowedRoles={['manager', 'admin']}>
              <ReportsPage />
            </RequireRole>
          }
        />
        <Route
          path="admin/weights"
          element={
            <RequireRole allowedRoles={['admin']}>
              <AdminWeightsPage />
            </RequireRole>
          }
        />
      </Route>

      <Route
        path="/applicant"
        element={
          <RequireRole allowedRoles={['applicant']}>
            <BaseLayout role="applicant" />
          </RequireRole>
        }
      >
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
