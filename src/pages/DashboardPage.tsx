import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { Box, Button, Card, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { RecordDialog } from "../components/RecordDialog";
import { StatCard } from "../components/StatCard";
import { useRecords } from "../services/financeService";
import { getCategoryTotals, getMonthlyNetSeries, sumRecords } from "../utils/financeCalculations";
import { formatChartValue, formatCurrency } from "../utils/formatters";

export const DashboardPage = () => {
  const records = useRecords();
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthRecords = records.filter(record => record.date.startsWith(monthKey));

  const incomePlan = sumRecords(monthRecords, "income", "planned");
  const incomeTrack = sumRecords(monthRecords, "income", "tracked");
  const expensePlan = sumRecords(monthRecords, "expense", "planned");
  const expenseTrack = sumRecords(monthRecords, "expense", "tracked");
  const netPlan = incomePlan - expensePlan;
  const netTrack = incomeTrack - expenseTrack;

  const monthly = getMonthlyNetSeries(records, now);

  const topExpenses = getCategoryTotals(monthRecords.filter(record => record.kind === "expense")).slice(0, 5);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={5}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>
              {now.toLocaleString(undefined, { month: "long", year: "numeric" })}
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, maxWidth: 760 }}>Plan meets reality.</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 620 }}>
              Track what you actually earn and spend, and see how it stacks up against what you intended.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <RecordDialog defaultKind="income" defaultMode="tracked" trigger={<Button variant="outlined" startIcon={<TrendingUpIcon color="success" />}>Income</Button>} />
            <RecordDialog defaultKind="expense" defaultMode="tracked" trigger={<Button variant="contained" startIcon={<AddIcon />}>New record</Button>} />
          </Stack>
        </Stack>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
          <StatCard label="Income" planned={incomePlan} tracked={incomeTrack} tone="income" />
          <StatCard label="Expenses" planned={expensePlan} tracked={expenseTrack} tone="expense" />
          <StatCard label="Net" planned={netPlan} tracked={netTrack} />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3 }}>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Net by month</Typography>
                <Typography variant="caption" color="text.secondary">Planned vs. tracked, last 6 months</Typography>
              </Box>
              <Button component={Link} to="/trends" size="small" endIcon={<ArrowForwardIcon />}>Trends</Button>
            </Stack>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} barCategoryGap={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ef" vertical={false} />
                  <XAxis dataKey="month" stroke="#69758a" fontSize={12} />
                  <YAxis stroke="#69758a" fontSize={12} tickFormatter={value => `$${value}`} />
                  <Tooltip formatter={formatChartValue} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="planned" fill="#5a75bd" name="Planned" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tracked" fill="#243d73" name="Tracked" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Top expenses</Typography>
                <Typography variant="caption" color="text.secondary">This month, by category</Typography>
              </Box>
              <Button component={Link} to="/compare" size="small" endIcon={<ArrowForwardIcon />}>Compare</Button>
            </Stack>
            <Stack spacing={2.5}>
              {topExpenses.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No expenses yet this month.</Typography>
              ) : (
                topExpenses.map(item => {
                  const percent = item.planned > 0 ? Math.min(100, (item.tracked / item.planned) * 100) : 100;
                  return (
                    <Box key={item.category}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                        <Typography variant="body2" fontWeight={600}>{item.category}</Typography>
                        <Typography variant="caption" color="text.secondary">{formatCurrency(item.tracked)} / {formatCurrency(item.planned)}</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={percent} sx={{ height: 6, borderRadius: 999, bgcolor: "rgba(105,117,138,0.16)", "& .MuiLinearProgress-bar": { bgcolor: item.tracked > item.planned ? "error.main" : "primary.main" } }} />
                    </Box>
                  );
                })
              )}
            </Stack>
          </Card>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
          <Callout icon={<WalletOutlinedIcon />} label="Records this month" value={String(monthRecords.length)} />
          <Callout icon={<TrendingUpIcon color="success" />} label="Income vs. plan" value={incomePlan ? `${Math.round((incomeTrack / incomePlan) * 100)}%` : "-"} />
          <Callout icon={<TrendingDownIcon color="error" />} label="Spending vs. plan" value={expensePlan ? `${Math.round((expenseTrack / expensePlan) * 100)}%` : "-"} />
        </Box>
      </Stack>
    </Container>
  );
};

const Callout = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: "#f1f4f8" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ width: 34, height: 34, display: "grid", placeItems: "center", bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 1.5 }}>{icon}</Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Stack>
      <Typography variant="h5" fontWeight={700}>{value}</Typography>
    </Stack>
  </Card>
);
