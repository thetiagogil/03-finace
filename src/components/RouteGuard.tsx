import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authService";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};
