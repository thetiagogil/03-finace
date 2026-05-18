import { Box, Card, Typography } from "@mui/material";

interface CompareStatsProps {
  trackedTotal: number;
  plannedTotal: number;
  riskCount: number;
  riskLabel: string;
  formatValue: (value: number) => string;
}

export const CompareStats = ({
  trackedTotal,
  plannedTotal,
  riskCount,
  riskLabel,
  formatValue,
}: CompareStatsProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
      gap: 2,
    }}
  >
    <Stat label="Tracked total" value={formatValue(trackedTotal)} />
    <Stat label="Planned total" value={formatValue(plannedTotal)} />
    <Stat label={riskLabel} value={String(riskCount)} color="error.main" />
  </Box>
);

const Stat = ({
  label,
  value,
  color = "text.primary",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
      }}
    >
      {label}
    </Typography>
    <Typography variant="h4" sx={{ mt: 1, color, fontWeight: 700 }}>
      {value}
    </Typography>
  </Card>
);
