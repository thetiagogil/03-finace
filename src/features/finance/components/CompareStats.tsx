import { Box, Card, Typography } from "@mui/material";

interface CompareStatsProps {
  trackedTotal: number;
  plannedTotal: number;
  riskCount: number;
  riskLabel: string;
  formatValue: (value: number) => string;
  largestVarianceCategory?: string;
  largestVarianceValue?: number;
  largestVarianceColor?: string;
}

export const CompareStats = ({
  trackedTotal,
  plannedTotal,
  riskCount,
  riskLabel,
  formatValue,
  largestVarianceCategory,
  largestVarianceValue,
  largestVarianceColor,
}: CompareStatsProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      },
      gap: 2,
    }}
  >
    <Stat label="Tracked total" value={formatValue(trackedTotal)} />
    <Stat label="Planned total" value={formatValue(plannedTotal)} />
    <Stat label={riskLabel} value={String(riskCount)} color="error.main" />
    {largestVarianceCategory && largestVarianceValue !== undefined ? (
      <Stat
        label="Largest variance"
        value={formatValue(largestVarianceValue)}
        detail={largestVarianceCategory}
        color={largestVarianceColor}
      />
    ) : null}
  </Box>
);

const Stat = ({
  label,
  value,
  color = "text.primary",
  detail,
}: {
  label: string;
  value: string;
  color?: string;
  detail?: string;
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
    {detail ? (
      <Typography variant="caption" color="text.secondary">
        {detail}
      </Typography>
    ) : null}
  </Card>
);
