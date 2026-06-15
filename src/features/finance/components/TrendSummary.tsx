import { Box, Card, Typography } from "@mui/material";
import { useMemo } from "react";
import type { TrendPoint } from "../lib/calculations";
import { FINANCE_COLORS } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";

interface TrendSummaryProps {
  data: TrendPoint[];
}

export const TrendSummary = ({ data }: TrendSummaryProps) => {
  const summary = useMemo(() => {
    const first = data[0];
    const latest = data.at(-1);
    const netChange =
      first && latest ? latest.netTracked - first.netTracked : 0;

    return {
      monthCount: data.length,
      latestLabel: latest?.label ?? "-",
      latestNet: latest?.netTracked ?? 0,
      netChange,
    };
  }, [data]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      <SummaryCard label="Months shown" value={String(summary.monthCount)} />
      <SummaryCard
        label={`Latest tracked net - ${summary.latestLabel}`}
        value={formatCurrency(summary.latestNet)}
        color={
          summary.latestNet >= 0
            ? FINANCE_COLORS.trackedIncome
            : FINANCE_COLORS.trackedExpense
        }
      />
      <SummaryCard
        label="Tracked net direction"
        value={`${summary.netChange >= 0 ? "+" : ""}${formatCurrency(
          summary.netChange,
        )}`}
        color={
          summary.netChange >= 0
            ? FINANCE_COLORS.trackedIncome
            : FINANCE_COLORS.trackedExpense
        }
      />
    </Box>
  );
};

const SummaryCard = ({
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
