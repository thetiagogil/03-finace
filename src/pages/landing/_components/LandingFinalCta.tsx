import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Stack, Typography } from "@mui/material";
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
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      {isAuthenticated ? (
        <Button
          size="large"
          variant="contained"
          component={Link}
          to="/dashboard"
          endIcon={<ArrowForwardIcon />}
        >
          Open dashboard
        </Button>
      ) : (
        <>
          <Button
            size="large"
            variant="contained"
            component={Link}
            to="/signup"
            endIcon={<ArrowForwardIcon />}
          >
            Sign up
          </Button>
          <Button size="large" variant="outlined" onClick={onTestUser}>
            Try demo account
          </Button>
        </>
      )}
    </Stack>
  </Box>
);
