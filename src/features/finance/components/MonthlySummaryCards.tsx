import { Box } from "@mui/material";
import { getPlanTrackTotals, getRecordsForMonth } from "../lib/calculations";
import { useMemo } from "react";
import type { FinanceRecord } from "../types";
import { StatCard } from "./StatCard";

interface MonthlySummaryCardsProps {
  records: FinanceRecord[];
  currentDate: Date;
}

export const MonthlySummaryCards = ({
  records,
  currentDate,
}: MonthlySummaryCardsProps) => {
  const monthRecords = useMemo(
    () => getRecordsForMonth(records, currentDate),
    [currentDate, records],
  );
  const totals = useMemo(
    () => getPlanTrackTotals(monthRecords),
    [monthRecords],
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      <StatCard
        label="Income"
        planned={totals.incomePlan}
        tracked={totals.incomeTrack}
        tone="income"
      />
      <StatCard
        label="Expenses"
        planned={totals.expensePlan}
        tracked={totals.expenseTrack}
        tone="expense"
      />
      <StatCard
        label="Net"
        planned={totals.netPlan}
        tracked={totals.netTrack}
      />
    </Box>
  );
};
