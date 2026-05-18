import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { continueWithTestUser } from "../../../features/auth/storage/auth-storage";
import { seedTestUserRecords } from "../../../features/auth/storage/test-data-storage";

export const useLandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const continueAsTestUser = () => {
    continueWithTestUser();
    seedTestUserRecords();
    navigate("/dashboard");
  };

  return {
    isAuthenticated,
    continueAsTestUser,
  };
};
