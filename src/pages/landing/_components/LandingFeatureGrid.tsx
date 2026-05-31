import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Typography } from "@mui/material";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <PlaylistAddIcon />,
    title: "Log both sides",
    text: "Track both your planned and actual finances in one place, so you can see the full picture of your financial health.",
  },
  {
    icon: <CompareArrowsIcon />,
    title: "Compare any period",
    text: "Side-by-side comparisons of any two months show you exactly where you went off-plan and where you nailed it.",
  },
  {
    icon: <ShowChartIcon />,
    title: "See your patterns",
    text: "Visualize your financial trends over time to understand your spending habits and make informed decisions for a healthier financial future.",
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
      Two perspectives. One clear picture.
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
