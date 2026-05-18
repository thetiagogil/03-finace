import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "../lib/calculations";
import { FINANCE_COLORS, getFinanceColor } from "../lib/colors";
import { formatChartValue, formatCurrencyAxis } from "../lib/formatters";

interface TrendChartsProps {
  data: TrendPoint[];
}

export const TrendCharts = ({ data }: TrendChartsProps) => (
  <>
    <ChartCard
      title="Net worth flow"
      subtitle="Tracked vs planned net per month"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="netTracked" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={FINANCE_COLORS.trackedIncome}
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor={FINANCE_COLORS.trackedIncome}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="netPlanned" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={FINANCE_COLORS.plannedIncome}
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor={FINANCE_COLORS.plannedIncome}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e7ef"
            vertical={false}
          />
          <XAxis dataKey="label" stroke="#69758a" fontSize={12} />
          <YAxis
            stroke="#69758a"
            fontSize={12}
            tickFormatter={formatCurrencyAxis}
          />
          <Tooltip formatter={formatChartValue} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area
            type="monotone"
            dataKey="netTracked"
            stroke={FINANCE_COLORS.trackedIncome}
            fill="url(#netTracked)"
            strokeWidth={2}
            name="Tracked net"
          />
          <Area
            type="monotone"
            dataKey="netPlanned"
            stroke={FINANCE_COLORS.plannedIncome}
            fill="url(#netPlanned)"
            strokeDasharray="4 4"
            name="Planned net"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
        gap: 3,
      }}
    >
      <TrendLine
        title="Income trend"
        plannedKey="incomePlanned"
        trackedKey="incomeTracked"
        trackedColor={getFinanceColor("income", "tracked")}
        plannedColor={getFinanceColor("income", "planned")}
        data={data}
      />
      <TrendLine
        title="Expense trend"
        plannedKey="expensePlanned"
        trackedKey="expenseTracked"
        trackedColor={getFinanceColor("expense", "tracked")}
        plannedColor={getFinanceColor("expense", "planned")}
        data={data}
      />
    </Box>
  </>
);

const ChartCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" fontWeight={700}>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {subtitle}
    </Typography>
    <Box sx={{ height: 300, mt: 2 }}>{children}</Box>
  </Card>
);

const TrendLine = ({
  title,
  plannedKey,
  trackedKey,
  trackedColor,
  plannedColor,
  data,
}: {
  title: string;
  plannedKey: keyof TrendPoint;
  trackedKey: keyof TrendPoint;
  trackedColor: string;
  plannedColor: string;
  data: TrendPoint[];
}) => (
  <ChartCard title={title} subtitle="Tracked vs planned">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e7ef"
          vertical={false}
        />
        <XAxis dataKey="label" stroke="#69758a" fontSize={12} />
        <YAxis
          stroke="#69758a"
          fontSize={12}
          tickFormatter={formatCurrencyAxis}
        />
        <Tooltip formatter={formatChartValue} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey={trackedKey}
          stroke={trackedColor}
          strokeWidth={2}
          name="Tracked"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey={plannedKey}
          stroke={plannedColor}
          strokeDasharray="4 4"
          name="Planned"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);
