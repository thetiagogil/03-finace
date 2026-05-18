import { TextField } from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";
import { AuthCard } from "./AuthCard";

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in"
      subtitle="Use a local browser-only profile. No data is sent to a server."
      onSubmit={form.handleSubmit}
      error={form.error}
      loading={form.loading}
      button="Sign in"
      footerText="No account?"
      footerLink="/signup"
      footerAction="Create one"
      testAction={form.handleTestUser}
      fields={
        <>
          <TextField
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(event) => form.setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(event) => form.setPassword(event.target.value)}
          />
        </>
      }
    />
  );
};
