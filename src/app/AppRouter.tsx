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
import {
  CategoriesPage,
  ComparePage,
  DashboardPage,
  LandingPage,
  LedgerPage,
  LoginPage,
  RecordsPage,
  SignupPage,
  TrendsPage,
} from "./lazy-pages";
import { RouteSuspense } from "./RouteSuspense";
import { ScrollToTop } from "./ScrollToTop";

export const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <PageShell>
        <RouteSuspense>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/ledger" element={<LedgerPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteSuspense>
      </PageShell>
    </Router>
  );
};
