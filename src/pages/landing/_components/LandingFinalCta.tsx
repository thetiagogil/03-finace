import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface LandingFinalCtaProps {
  isAuthenticated: boolean;
  onTestUser: () => void;
}

export const LandingFinalCta = ({
  isAuthenticated,
  onTestUser,
}: LandingFinalCtaProps) => (
  <Box component="section" sx={{ py: 10, textAlign: "center" }}>
    <Typography variant="h2" sx={{ maxWidth: 680, mx: "auto" }}>
      Stop guessing. Start comparing.
    </Typography>
    <Button
      size="large"
      variant="contained"
      sx={{ mt: 4 }}
      component={isAuthenticated ? Link : "button"}
      to={isAuthenticated ? "/dashboard" : undefined}
      onClick={isAuthenticated ? undefined : onTestUser}
    >
      {isAuthenticated ? "Open dashboard" : "Continue with demo account"}
    </Button>
  </Box>
);
