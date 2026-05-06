import { FormEvent, useContext, useState } from "react";
import { FormPageContainer } from "../components/shared/containers.js";
import { FormAuth } from "../components/shared/form-auth.js";
import { AuthContext } from "../contexts/auth.context.js";

export const SignupPage = () => {
  const { handleSignup } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const payload = { firstname, lastname, email, password };
    try {
      await handleSignup(payload);
    } catch (error) {
      throw error;
    } finally {
      setLoadingSubmit(false);
    }
  };

  const form = {
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setPasswordConfirmation
  };

  return (
    <FormPageContainer>
      <FormAuth signup form={form} handleSubmit={handleSubmit} loadingSubmit={loadingSubmit} />
    </FormPageContainer>
  );
};
