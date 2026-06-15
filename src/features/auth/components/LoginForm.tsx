import { TextField } from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";
import { AuthCard } from "./AuthCard";

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Log in"
      subtitle="Use a local browser-only profile. No data is sent to a server."
      onSubmit={form.handleSubmit}
      error={form.error}
      loading={form.loading}
      button="Log in"
      footerText="No account?"
      footerLink="/signup"
      footerAction="Sign up"
      testAction={form.handleTestUser}
      fields={
        <>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            required
            value={form.email}
            onChange={(event) => form.setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            required
            value={form.password}
            onChange={(event) => form.setPassword(event.target.value)}
          />
        </>
      }
    />
  );
};
