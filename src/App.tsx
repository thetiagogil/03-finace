import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageShell } from "./components/PageShell";
import { CategoriesPage } from "./pages/CategoriesPage";
import { ComparePage } from "./pages/ComparePage";
import { DashboardPage } from "./pages/DashboardPage";
import { LedgerPage } from "./pages/LedgerPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import { RecordsPage } from "./pages/RecordsPage";
import { TrendsPage } from "./pages/TrendsPage";
import { useAuth } from "./services/authService";
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
            <Route path="/login" element={<PublicOnly><LoginPage /></PublicOnly>} />
            <Route path="/signup" element={<PublicOnly><SignupPage /></PublicOnly>} />
            <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
            <Route path="/records" element={<Protected><RecordsPage /></Protected>} />
            <Route path="/ledger" element={<Protected><LedgerPage /></Protected>} />
            <Route path="/compare" element={<Protected><ComparePage /></Protected>} />
            <Route path="/trends" element={<Protected><TrendsPage /></Protected>} />
            <Route path="/categories" element={<Protected><CategoriesPage /></Protected>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageShell>
      </Router>
    </ThemeProvider>
  );
};

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicOnly = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default App;
