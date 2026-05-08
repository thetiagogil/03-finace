import { Alert, Box, Button, Card, Container, Stack, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { continueWithTestUser, login, signup } from "../services/authService";
import { seedTestUserRecords } from "../services/testDataService";

export const LoginPage = () => {
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
      setError(caughtError instanceof Error ? caughtError.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTestUser = () => {
    continueWithTestUser();
    seedTestUserRecords();
    navigate("/dashboard");
  };

  return <AuthCard eyebrow="Welcome back" title="Sign in" subtitle="Use a local browser-only profile. No data is sent to a server." onSubmit={handleSubmit} error={error} loading={loading} button="Sign in" footerText="No account?" footerLink="/signup" footerAction="Create one" testAction={handleTestUser} fields={<><TextField label="Email" type="email" required value={email} onChange={event => setEmail(event.target.value)} /><TextField label="Password" type="password" required value={password} onChange={event => setPassword(event.target.value)} /></>} />;
};

export const SignupPage = () => {
  const navigate = useNavigate();
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
      setError(caughtError instanceof Error ? caughtError.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return <AuthCard eyebrow="Get started" title="Create local profile" subtitle="New profiles start empty and store data only in this browser." onSubmit={handleSubmit} error={error} loading={loading} button="Create profile" footerText="Already have an account?" footerLink="/login" footerAction="Sign in" fields={<><TextField label="Name" required value={name} onChange={event => setName(event.target.value)} /><TextField label="Email" type="email" required value={email} onChange={event => setEmail(event.target.value)} /><TextField label="Password" type="password" required helperText="At least 6 characters." value={password} onChange={event => setPassword(event.target.value)} /></>} />;
};

const AuthCard = ({
  eyebrow,
  title,
  subtitle,
  fields,
  onSubmit,
  error,
  loading,
  button,
  footerText,
  footerLink,
  footerAction,
  testAction
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  onSubmit: (event: FormEvent) => void;
  error: string;
  loading: boolean;
  button: string;
  footerText: string;
  footerLink: string;
  footerAction: string;
  testAction?: () => void;
}) => (
  <Container maxWidth="sm">
    <Box sx={{ minHeight: "calc(100vh - 96px)", display: "flex", alignItems: "center", px: 1 }}>
      <Card variant="outlined" sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>{eyebrow}</Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{subtitle}</Typography>
        <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 3 }}>
          {fields}
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" disabled={loading}>{loading ? "Please wait..." : button}</Button>
          {testAction && <Button type="button" variant="outlined" onClick={testAction}>Continue with test user</Button>}
        </Stack>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          {footerText} <Typography component={Link} to={footerLink} sx={{ color: "text.primary", fontWeight: 700, textDecoration: "none" }}>{footerAction}</Typography>
        </Typography>
      </Card>
    </Box>
  </Container>
);
