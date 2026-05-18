import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FINANCE_COLORS } from "../../../features/finance/lib/colors";

interface LandingHeroProps {
  isAuthenticated: boolean;
  onTestUser: () => void;
}

export const LandingHero = ({
  isAuthenticated,
  onTestUser,
}: LandingHeroProps) => (
  <Box>
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.22em",
      }}
    >
      Ace your finances
    </Typography>
    <Typography
      variant="h1"
      sx={{ mt: 2, fontSize: { xs: 48, md: 76 }, lineHeight: 1.04 }}
    >
      What you{" "}
      <Box
        component="span"
        sx={{ color: FINANCE_COLORS.plannedIncome, fontStyle: "italic" }}
      >
        planned
      </Box>
      .
      <br />
      What actually{" "}
      <Box
        component="span"
        sx={{ color: FINANCE_COLORS.trackedIncome, fontStyle: "italic" }}
      >
        happened
      </Box>
      .
    </Typography>
    <Typography
      variant="h6"
      sx={{
        color: "text.secondary",
        mt: 3,
        maxWidth: 590,
        fontWeight: 400,
      }}
    >
      FIN/ACE keeps your intentions and your reality side by side, so you can
      finally see where the two diverge and do something about it.
    </Typography>
    <Stack
      direction="row"
      spacing={1.5}
      flexWrap="wrap"
      useFlexGap
      sx={{ mt: 4 }}
    >
      {isAuthenticated ? (
        <Button
          component={Link}
          to="/dashboard"
          size="large"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Open dashboard
        </Button>
      ) : (
        <>
          <Button
            component={Link}
            to="/signup"
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            Get started
          </Button>
          <Button component={Link} to="/login" size="large" variant="outlined">
            Sign in
          </Button>
          <Button size="large" variant="text" onClick={onTestUser}>
            Test the app
          </Button>
        </>
      )}
    </Stack>
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ mt: 4, color: "text.secondary" }}
    >
      <LockOutlinedIcon sx={{ fontSize: 16 }} />
      <Typography variant="caption">
        100% local. Your data never leaves this browser.
      </Typography>
    </Stack>
  </Box>
);
