import { Box, Card, Typography } from "@mui/material";
import { useMemo } from "react";
import { getRecordTotals, shownModes } from "../lib/calculations";
import { FINANCE_COLORS } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import type { FinanceRecord, ModeFilter } from "../types";

interface LedgerSummaryProps {
  records: FinanceRecord[];
  mode: ModeFilter;
}

export const LedgerSummary = ({ records, mode }: LedgerSummaryProps) => {
  const summary = useMemo(() => {
    const modes = shownModes(mode);
    const selectedRecords = records.filter((record) =>
      modes.includes(record.mode),
    );
    const categories = new Set(
      selectedRecords.map((record) => `${record.type}:${record.category}`),
    );

    return {
      recordCount: selectedRecords.length,
      categoryCount: categories.size,
      totals: getRecordTotals(selectedRecords),
    };
  }, [mode, records]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      <SummaryCard
        label="Records in view"
        value={String(summary.recordCount)}
      />
      <SummaryCard
        label="Active categories"
        value={String(summary.categoryCount)}
      />
      <SummaryCard
        label={mode === "both" ? "Selected net" : `${mode} net`}
        value={formatCurrency(summary.totals.net)}
        color={
          summary.totals.net >= 0
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
