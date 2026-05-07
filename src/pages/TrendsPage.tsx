import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecords } from "../services/financeService";
import { getTrendSeries } from "../utils/financeCalculations";
import { formatChartValue } from "../utils/formatters";

export const TrendsPage = () => {
  const records = useRecords();

  const monthly = useMemo(() => {
    return getTrendSeries(records);
  }, [records]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>Across time</Typography>
          <Typography variant="h3">Trends</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>How your year is unfolding.</Typography>
        </Box>
        <ChartCard title="Net worth flow" subtitle="Planned vs tracked net per month">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="netTracked" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#243d73" stopOpacity={0.3} /><stop offset="100%" stopColor="#243d73" stopOpacity={0} /></linearGradient>
                <linearGradient id="netPlanned" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a75bd" stopOpacity={0.25} /><stop offset="100%" stopColor="#5a75bd" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ef" vertical={false} />
              <XAxis dataKey="label" stroke="#69758a" fontSize={12} />
              <YAxis stroke="#69758a" fontSize={12} tickFormatter={value => `$${value}`} />
              <Tooltip formatter={formatChartValue} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="netPlanned" stroke="#5a75bd" fill="url(#netPlanned)" strokeDasharray="4 4" name="Planned net" />
              <Area type="monotone" dataKey="netTracked" stroke="#243d73" fill="url(#netTracked)" strokeWidth={2} name="Tracked net" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 3 }}>
          <TrendLine title="Income trend" plannedKey="incomePlanned" trackedKey="incomeTracked" trackedColor="#2f9d68" data={monthly} />
          <TrendLine title="Expense trend" plannedKey="expensePlanned" trackedKey="expenseTracked" trackedColor="#c44a36" data={monthly} />
        </Box>
      </Stack>
    </Container>
  );
};

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" fontWeight={700}>{title}</Typography>
    <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
    <Box sx={{ height: 300, mt: 2 }}>{children}</Box>
  </Card>
);

const TrendLine = ({ title, plannedKey, trackedKey, trackedColor, data }: { title: string; plannedKey: string; trackedKey: string; trackedColor: string; data: object[] }) => (
  <ChartCard title={title} subtitle="Planned vs tracked">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ef" vertical={false} />
        <XAxis dataKey="label" stroke="#69758a" fontSize={12} />
        <YAxis stroke="#69758a" fontSize={12} tickFormatter={value => `$${value}`} />
        <Tooltip formatter={formatChartValue} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey={plannedKey} stroke="#5a75bd" strokeDasharray="4 4" name="Planned" dot={false} />
        <Line type="monotone" dataKey={trackedKey} stroke={trackedColor} strokeWidth={2} name="Tracked" dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);
