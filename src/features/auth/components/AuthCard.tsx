import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  fields: ReactNode;
  onSubmit: (event: FormEvent) => void;
  error: string;
  loading: boolean;
  button: string;
  footerText: string;
  footerLink: string;
  footerAction: string;
  testAction?: () => void;
}

export const AuthCard = ({
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
  testAction,
}: AuthCardProps) => (
  <Container maxWidth="sm">
    <Box
      sx={{
        minHeight: "calc(100vh - 96px)",
        display: "flex",
        alignItems: "center",
        px: 1,
      }}
    >
      <Card variant="outlined" sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          {eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
        <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 3 }}>
          {fields}
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Please wait..." : button}
          </Button>
          {testAction && (
            <>
              <Divider
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                }}
              >
                OR
              </Divider>
              <Button type="button" variant="outlined" onClick={testAction}>
                Continue with demo account
              </Button>
            </>
          )}
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          {footerText}{" "}
          <Typography
            component={Link}
            to={footerLink}
            sx={{
              color: "text.primary",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {footerAction}
          </Typography>
        </Typography>
      </Card>
    </Box>
  </Container>
);
