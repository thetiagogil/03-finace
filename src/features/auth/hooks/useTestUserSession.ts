import { useNavigate } from "react-router-dom";
import { continueWithTestUser } from "../storage/auth-storage";
import { seedTestUserRecords } from "../storage/test-data-storage";

export const useTestUserSession = (onError?: (message: string) => void) => {
  const navigate = useNavigate();

  return () => {
    try {
      continueWithTestUser();
      seedTestUserRecords();
      navigate("/dashboard");
    } catch (caughtError) {
      onError?.(
        caughtError instanceof Error
          ? caughtError.message
          : "Demo account could not be loaded",
      );
    }
  };
};
