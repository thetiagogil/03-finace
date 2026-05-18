import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getMonthlyNetSeries } from "../lib/calculations";
import { FINANCE_COLORS } from "../lib/colors";
import { formatChartValue, formatCurrencyAxis } from "../lib/formatters";
import type { FinanceRecord } from "../types";

interface MonthlyNetChartProps {
  records: FinanceRecord[];
  currentDate: Date;
}

export const MonthlyNetChart = ({
  records,
  currentDate,
}: MonthlyNetChartProps) => {
  const monthly = getMonthlyNetSeries(records, currentDate);

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Net by month
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Tracked vs. planned, last 6 months
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/trends"
          size="small"
          endIcon={<ArrowForwardIcon />}
        >
          Trends
        </Button>
      </Stack>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} barCategoryGap={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e7ef"
              vertical={false}
            />
            <XAxis dataKey="month" stroke="#69758a" fontSize={12} />
            <YAxis
              stroke="#69758a"
              fontSize={12}
              tickFormatter={formatCurrencyAxis}
            />
            <Tooltip formatter={formatChartValue} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="tracked"
              fill={FINANCE_COLORS.trackedIncome}
              name="Tracked"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="planned"
              fill={FINANCE_COLORS.plannedIncome}
              name="Planned"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
