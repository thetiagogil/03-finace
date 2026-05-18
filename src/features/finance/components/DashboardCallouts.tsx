import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { Box, Card, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { getPlanTrackTotals, getRecordsForMonth } from "../lib/calculations";
import { FINANCE_COLORS } from "../lib/colors";
import type { FinanceRecord } from "../types";

interface DashboardCalloutsProps {
  records: FinanceRecord[];
  currentDate: Date;
}

export const DashboardCallouts = ({
  records,
  currentDate,
}: DashboardCalloutsProps) => {
  const monthRecords = getRecordsForMonth(records, currentDate);
  const totals = getPlanTrackTotals(monthRecords);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      <Callout
        icon={<WalletOutlinedIcon />}
        label="Records this month"
        value={String(monthRecords.length)}
      />
      <Callout
        icon={<TrendingUpIcon sx={{ color: FINANCE_COLORS.trackedIncome }} />}
        label="Income vs. plan"
        value={
          totals.incomePlan
            ? `${Math.round((totals.incomeTrack / totals.incomePlan) * 100)}%`
            : "-"
        }
      />
      <Callout
        icon={
          <TrendingDownIcon sx={{ color: FINANCE_COLORS.trackedExpense }} />
        }
        label="Spending vs. plan"
        value={
          totals.expensePlan
            ? `${Math.round((totals.expenseTrack / totals.expensePlan) * 100)}%`
            : "-"
        }
      />
    </Box>
  );
};

const Callout = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <Card variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: "#f1f4f8" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 34,
            height: 34,
            display: "grid",
            placeItems: "center",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
      <Typography variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </Stack>
  </Card>
);
