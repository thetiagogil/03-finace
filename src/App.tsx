import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageShell } from "./components/PageShell";
import { ProtectedRoute, PublicOnlyRoute } from "./components/RouteGuard";
import { CategoriesPage } from "./pages/CategoriesPage";
import { ComparePage } from "./pages/ComparePage";
import { DashboardPage } from "./pages/DashboardPage";
import { LedgerPage } from "./pages/LedgerPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import { RecordsPage } from "./pages/RecordsPage";
import { TrendsPage } from "./pages/TrendsPage";
import { appTheme } from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,32,51,0.06) 1px, transparent 0)",
            backgroundSize: "28px 28px"
          }
        }}
      />
      <Router>
        <PageShell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
            <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><RecordsPage /></ProtectedRoute>} />
            <Route path="/ledger" element={<ProtectedRoute><LedgerPage /></ProtectedRoute>} />
            <Route path="/compare" element={<ProtectedRoute><ComparePage /></ProtectedRoute>} />
            <Route path="/trends" element={<ProtectedRoute><TrendsPage /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageShell>
      </Router>
    </ThemeProvider>
  );
};

export default App;
