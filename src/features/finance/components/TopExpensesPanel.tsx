import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getCategoryTotals, getRecordsForMonth } from "../lib/calculations";
import { FINANCE_COLORS } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import type { FinanceRecord } from "../types";
import { EmptyState } from "../../../shared/components/ui/EmptyState";

interface TopExpensesPanelProps {
  records: FinanceRecord[];
  currentDate: Date;
}

export const TopExpensesPanel = ({
  records,
  currentDate,
}: TopExpensesPanelProps) => {
  const monthRecords = useMemo(
    () => getRecordsForMonth(records, currentDate),
    [currentDate, records],
  );
  const topExpenses = useMemo(
    () =>
      getCategoryTotals(
        monthRecords.filter((record) => record.type === "expense"),
      ).slice(0, 5),
    [monthRecords],
  );

  return (
    <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Top expenses
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This month, by category
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/compare"
          size="small"
          endIcon={<ArrowForwardIcon />}
        >
          Compare
        </Button>
      </Stack>
      <Stack spacing={2.5}>
        {topExpenses.length === 0 ? (
          <EmptyState
            title="No expenses this month"
            description="Add tracked or planned expense records for this month to see the largest categories here."
            compact
            variant="plain"
          />
        ) : (
          topExpenses.map((item) => {
            const trackedPercentOfPlan =
              item.planned > 0
                ? Math.min(100, (item.tracked / item.planned) * 100)
                : item.tracked > 0
                  ? 100
                  : 0;
            const hasExceededPlan =
              item.planned > 0 ? item.tracked > item.planned : item.tracked > 0;
            return (
              <Box key={item.category}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 0.75 }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {item.category}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(item.tracked)} /{" "}
                    {formatCurrency(item.planned)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={trackedPercentOfPlan}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    bgcolor: FINANCE_COLORS.plannedExpenseSoft,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: hasExceededPlan
                        ? FINANCE_COLORS.trackedExpense
                        : FINANCE_COLORS.trackedExpenseMuted,
                    },
                  }}
                />
              </Box>
            );
          })
        )}
      </Stack>
    </Card>
  );
};
