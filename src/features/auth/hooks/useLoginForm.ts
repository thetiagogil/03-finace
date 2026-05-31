import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../storage/auth-storage";
import { useTestUserSession } from "./useTestUserSession";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const handleTestUser = useTestUserSession();
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
        caughtError instanceof Error ? caughtError.message : "Log in failed",
      );
    } finally {
      setLoading(false);
    }
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
