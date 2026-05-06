import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { ActivityPage } from "../pages/activity.page";
import { DashboardPage } from "../pages/dashboard.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { OverviewPage } from "../pages/overview.page";
import { SignupPage } from "../pages/signup.page";

export const App = () => {
  const { isAuthenticated, hasData } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : hasData ? (
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="*" element={<Navigate to="/activity" />} />
        </Routes>
      )}
    </>
  );
};
