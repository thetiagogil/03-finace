import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { continueWithTestUser, login } from "../storage/auth-storage";
import { seedTestUserRecords } from "../storage/test-data-storage";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      login({ email, password });
      navigate("/dashboard");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTestUser = () => {
    continueWithTestUser();
    seedTestUserRecords();
    navigate("/dashboard");
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    handleTestUser,
  };
};
