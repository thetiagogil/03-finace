import {
  Box,
  Card,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FINANCE_COLORS, getFinanceColor } from "../lib/utils/financeColors";
import { formatCurrency } from "../lib/utils/formatters";

interface StatCardProps {
  label: string;
  planned: number;
  tracked: number;
  tone?: "income" | "expense" | "neutral";
}

export const StatCard = ({
  label,
  planned,
  tracked,
  tone = "neutral",
}: StatCardProps) => {
  const diff = tracked - planned;
  const diffGood = tone === "expense" ? diff <= 0 : diff >= 0;
  const percent = planned !== 0 ? (tracked / planned) * 100 : 0;
  const trackedColor =
    tone === "income"
      ? getFinanceColor("income", "tracked")
      : tone === "expense"
        ? getFinanceColor("expense", "tracked")
        : tracked >= 0
          ? FINANCE_COLORS.trackedIncome
          : FINANCE_COLORS.trackedExpense;
  const plannedColor =
    tone === "income"
      ? getFinanceColor("income", "planned")
      : tone === "expense"
        ? getFinanceColor("expense", "planned")
        : planned >= 0
          ? FINANCE_COLORS.plannedIncome
          : FINANCE_COLORS.plannedExpense;

  return (
    <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
          <Chip
            size="small"
            label={`${diff >= 0 ? "+" : ""}${formatCurrency(diff)}`}
            sx={{
              bgcolor: diffGood
                ? FINANCE_COLORS.trackedIncomeSoft
                : FINANCE_COLORS.trackedExpenseSoft,
              color: diffGood
                ? FINANCE_COLORS.trackedIncome
                : FINANCE_COLORS.trackedExpense,
              fontWeight: 700,
            }}
          />
        </Stack>
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: trackedColor,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatCurrency(tracked)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Planned{" "}
            <Box component="span" sx={{ color: plannedColor }}>
              {formatCurrency(planned)}
            </Box>
          </Typography>
        </Box>
        <Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, percent))}
            sx={{
              height: 6,
              borderRadius: 999,
              bgcolor: "rgba(105, 117, 138, 0.16)",
              "& .MuiLinearProgress-bar": { bgcolor: trackedColor },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {Math.round(percent)}% of plan
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};
