import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Typography } from "@mui/material";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <PlaylistAddIcon />,
    title: "Log both sides",
    text: "Record what you planned and what actually happened. Income or expense, every entry has a mode.",
  },
  {
    icon: <CompareArrowsIcon />,
    title: "Compare any period",
    text: "Filter by year, drill into any month, and see exactly where reality drifted from your intentions.",
  },
  {
    icon: <ShowChartIcon />,
    title: "See your patterns",
    text: "Trends across months reveal what consistently goes off-plan and what you have mastered.",
  },
];

export const LandingFeatureGrid = () => (
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
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </Box>
  </Box>
);
