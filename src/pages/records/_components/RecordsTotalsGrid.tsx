import { Box } from "@mui/material";
import { RecordsSummary } from "../../../features/finance/components/RecordsSummary";
import { FINANCE_COLORS } from "../../../features/finance/lib/colors";
import { formatCurrency } from "../../../features/finance/lib/formatters";

interface RecordsTotalsGridProps {
  totals: {
    income: number;
    expense: number;
    net: number;
  };
}

export const RecordsTotalsGrid = ({ totals }: RecordsTotalsGridProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
      gap: 2,
    }}
  >
    <RecordsSummary
      label="Total income"
      value={formatCurrency(totals.income)}
      color={FINANCE_COLORS.trackedIncome}
    />
    <RecordsSummary
      label="Total expense"
      value={formatCurrency(totals.expense)}
      color={FINANCE_COLORS.trackedExpense}
    />
    <RecordsSummary
      label="Net"
      value={formatCurrency(totals.net)}
      color={
        totals.net >= 0
          ? FINANCE_COLORS.trackedIncome
          : FINANCE_COLORS.trackedExpense
      }
    />
  </Box>
);
