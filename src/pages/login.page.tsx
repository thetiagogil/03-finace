import { FormEvent, useContext, useState } from "react";
import { FormPageContainer } from "../components/shared/containers";
import { FormAuth } from "../components/shared/form-auth";
import { AuthContext } from "../contexts/auth.context";

export const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setLoginError("");
    const payload = { email, password };
    try {
      await handleLogin(payload);
    } catch (error) {
      setLoginError("Invalid username or password.");
      console.error("Login error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const form = {
    email,
    password,
    setEmail,
    setPassword
  };

  return (
    <FormPageContainer>
      <FormAuth login form={form} handleSubmit={handleSubmit} loadingSubmit={loadingSubmit} loginError={loginError} />
    </FormPageContainer>
  );
};
