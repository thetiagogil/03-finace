import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { BudgetPage } from "../pages/budget.page";
import { DashboardPage } from "../pages/dashboard.page";
import { HomePage } from "../pages/home.page";
import { InsightsPage } from "../pages/insights.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { TransactionsPage } from "../pages/transactions.page";

export const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}
    </>
  );
};
