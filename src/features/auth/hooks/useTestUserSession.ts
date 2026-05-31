import { useNavigate } from "react-router-dom";
import { continueWithTestUser } from "../storage/auth-storage";
import { seedTestUserRecords } from "../storage/test-data-storage";

export const useTestUserSession = () => {
  const navigate = useNavigate();

  return () => {
    continueWithTestUser();
    seedTestUserRecords();
    navigate("/dashboard");
  };
};
