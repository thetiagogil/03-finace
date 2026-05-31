import { TextField } from "@mui/material";
import { useSignupForm } from "../hooks/useSignupForm";
import { AuthCard } from "./AuthCard";

export const SignupForm = () => {
  const form = useSignupForm();

  return (
    <AuthCard
      eyebrow="Sign up"
      title="Sign up"
      subtitle="New profiles start empty and store data only in this browser."
      onSubmit={form.handleSubmit}
      error={form.error}
      loading={form.loading}
      button="Sign up"
      footerText="Already have an account?"
      footerLink="/login"
      footerAction="Log in"
      testAction={form.handleTestUser}
      fields={
        <>
          <TextField
            label="Name"
            required
            value={form.name}
            onChange={(event) => form.setName(event.target.value)}
          />
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
            helperText="At least 6 characters."
            value={form.password}
            onChange={(event) => form.setPassword(event.target.value)}
          />
        </>
      }
    />
  );
};
