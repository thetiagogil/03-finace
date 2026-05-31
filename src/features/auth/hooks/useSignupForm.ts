import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../storage/auth-storage";
import { useTestUserSession } from "./useTestUserSession";

export const useSignupForm = () => {
  const navigate = useNavigate();
  const handleTestUser = useTestUserSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      signup({ name, email, password });
      navigate("/dashboard");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Sign up failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    error,
    loading,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
    handleTestUser,
  };
};
