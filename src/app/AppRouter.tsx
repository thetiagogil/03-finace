import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "../features/auth/components/RouteGuard";
import { PageShell } from "../shared/components/layout/PageShell";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { CategoriesPage } from "../pages/categories/CategoriesPage";
import { ComparePage } from "../pages/compare/ComparePage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { LandingPage } from "../pages/landing/LandingPage";
import { LedgerPage } from "../pages/ledger/LedgerPage";
import { RecordsPage } from "../pages/records/RecordsPage";
import { TrendsPage } from "../pages/trends/TrendsPage";

export const AppRouter = () => {
  return (
    <Router>
      <PageShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoute>
                <RecordsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ledger"
            element={
              <ProtectedRoute>
                <LedgerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <ComparePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <TrendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
    </Router>
  );
};
