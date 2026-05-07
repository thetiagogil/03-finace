import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { continueWithTestUser, useAuth } from "../services/authService";
import { seedTestUserRecords } from "../services/financeService";

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleTestUser = () => {
    continueWithTestUser();
    seedTestUserRecords();
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="lg" sx={{ px: 3 }}>
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 6,
          alignItems: "center",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
            }}
          >
            Personal finance, honestly
          </Typography>
          <Typography
            variant="h1"
            sx={{ mt: 2, fontSize: { xs: 48, md: 76 }, lineHeight: 1.04 }}
          >
            What you{" "}
            <Box
              component="span"
              sx={{ color: "#5a75bd", fontStyle: "italic" }}
            >
              planned
            </Box>
            .
            <br />
            What actually{" "}
            <Box
              component="span"
              sx={{ color: "error.main", fontStyle: "italic" }}
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
            FIN/ACE keeps your intentions and your reality side by side, so you
            can finally see where the two diverge and do something about it.
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
                <Button
                  component={Link}
                  to="/login"
                  size="large"
                  variant="outlined"
                >
                  Sign in
                </Button>
                <Button size="large" variant="text" onClick={handleTestUser}>
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
        <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
          <Stack sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              April 2026
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Tile label="Planned" value="€3,200" color="#5a75bd" />
            <Tile
              label="Tracked"
              value="€3,580"
              color="#c44a36"
              delta="+12% vs plan"
            />
          </Stack>
          <Stack spacing={2} sx={{ mt: 3 }}>
            {[
              { label: "Groceries", planned: 450, tracked: 510 },
              { label: "Dining", planned: 200, tracked: 285 },
              { label: "Transport", planned: 120, tracked: 95 },
            ].map((item) => {
              const percent = Math.min(
                100,
                (item.tracked / item.planned) * 100,
              );
              return (
                <Box key={item.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.75 }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      €{item.tracked} / €{item.planned}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      height: 6,
                      borderRadius: 999,
                      bgcolor: "rgba(105,117,138,0.16)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor:
                          item.tracked > item.planned
                            ? "error.main"
                            : "primary.main",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Card>
      </Box>
      <Divider />
      <Box component="section" sx={{ py: 8 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          How it works
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, maxWidth: 650 }}>
          Two perspectives. One clearer picture.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mt: 5,
          }}
        >
          <Feature
            icon={<PlaylistAddIcon />}
            title="Log both sides"
            text="Record what you planned and what actually happened. Income or expense, every entry has a mode."
          />
          <Feature
            icon={<CompareArrowsIcon />}
            title="Compare any period"
            text="Filter by year, drill into any month, and see exactly where reality drifted from your intentions."
          />
          <Feature
            icon={<ShowChartIcon />}
            title="See your patterns"
            text="Trends across months reveal what consistently goes off-plan and what you have mastered."
          />
        </Box>
      </Box>
      <Divider />
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
          onClick={isAuthenticated ? undefined : handleTestUser}
        >
          {isAuthenticated ? "Open dashboard" : "Continue with test user"}
        </Button>
      </Box>
    </Container>
  );
};

const Tile = ({
  label,
  value,
  color,
  delta,
}: {
  label: string;
  value: string;
  color: string;
  delta?: string;
}) => (
  <Card
    variant="outlined"
    sx={{ flex: 1, p: 2, bgcolor: "#f1f4f8", borderRadius: 2 }}
  >
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
      }}
    >
      {label}
    </Typography>
    <Typography variant="h4" sx={{ color, fontWeight: 700, mt: 0.5 }}>
      {value}
    </Typography>
    {delta && (
      <Typography variant="caption" color="text.secondary">
        {delta}
      </Typography>
    )}
  </Card>
);

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
    <Box
      sx={{
        width: 42,
        height: 42,
        display: "grid",
        placeItems: "center",
        bgcolor: "#f1f4f8",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {text}
    </Typography>
  </Card>
);
