import { Box, Card, Container, FormControl, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EmptyState } from "../components/EmptyState";
import { PeriodFilter } from "../components/PeriodFilter";
import type { RecordKind } from "../models/finance";
import { useRecords } from "../services/financeService";
import { getCompareRows } from "../utils/financeCalculations";
import { formatChartValue, formatCurrency, formatCurrencyAxis } from "../utils/formatters";
import { allMonths, getPeriodLabel, getYearOptions } from "../utils/period";

export const ComparePage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(allMonths);
  const [kind, setKind] = useState<RecordKind>("expense");

  const rows = useMemo(() => {
    return getCompareRows(records, kind, year, month);
  }, [kind, month, records, year]);

  const totals = rows.reduce((sum, row) => ({ planned: sum.planned + row.planned, tracked: sum.tracked + row.tracked }), { planned: 0, tracked: 0 });
  const riskCount = kind === "expense" ? rows.filter(row => row.diff > 0).length : rows.filter(row => row.diff < 0).length;
  const emptyTitle = records.length === 0 ? "No records to compare" : `No ${kind} records for this period`;
  const emptyDescription = records.length === 0
    ? "Add planned and tracked records to compare your intentions against reality."
    : "Change the period or type filter, or add records for this selection.";

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>Side by side - {getPeriodLabel(year, month)}</Typography>
            <Typography variant="h3">Compare</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>See where reality drifted from your plan, category by category.</Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <PeriodFilter year={year} month={month} years={years} onChange={next => { setYear(next.year); setMonth(next.month); }} />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Kind</InputLabel>
              <Select label="Kind" value={kind} onChange={event => setKind(event.target.value as RecordKind)}>
                <MenuItem value="expense">Expenses</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
          <Stat label="Planned total" value={formatCurrency(totals.planned)} />
          <Stat label="Tracked total" value={formatCurrency(totals.tracked)} />
          <Stat label={kind === "expense" ? "Over budget categories" : "Under target categories"} value={String(riskCount)} color="error.main" />
        </Box>
        <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>By category</Typography>
          {rows.length === 0 ? (
            <EmptyState title={emptyTitle} description={emptyDescription} compact variant="plain" />
          ) : (
            <Box sx={{ height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ef" horizontal={false} />
                  <XAxis type="number" stroke="#69758a" fontSize={12} tickFormatter={formatCurrencyAxis} />
                  <YAxis dataKey="category" type="category" stroke="#69758a" fontSize={12} width={110} />
                  <Tooltip formatter={formatChartValue} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="planned" fill="#5a75bd" name="Planned" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="tracked" fill={kind === "expense" ? "#c44a36" : "#2f9d68"} name="Tracked" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Card>
        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead><TableRow><TableCell>Category</TableCell><TableCell align="right">Planned</TableCell><TableCell align="right">Tracked</TableCell><TableCell align="right">Diff</TableCell><TableCell align="right">% of plan</TableCell></TableRow></TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 3 }}>
                    <EmptyState title={emptyTitle} description={emptyDescription} compact variant="plain" />
                  </TableCell>
                </TableRow>
              ) : rows.map(row => {
                const bad = kind === "expense" ? row.diff > 0 : row.diff < 0;
                return (
                  <TableRow key={row.category}>
                    <TableCell sx={{ fontWeight: 700 }}>{row.category}</TableCell>
                    <TableCell align="right">{formatCurrency(row.planned)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.tracked)}</TableCell>
                    <TableCell align="right" sx={{ color: bad ? "error.main" : "success.main", fontWeight: 700 }}>{row.diff >= 0 ? "+" : ""}{formatCurrency(row.diff)}</TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>{row.percent === null ? "-" : `${Math.round(row.percent)}%`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </Container>
  );
};

const Stat = ({ label, value, color = "text.primary" }: { label: string; value: string; color?: string }) => (
  <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
    <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.16em" }}>{label}</Typography>
    <Typography variant="h4" sx={{ mt: 1, color, fontWeight: 700 }}>{value}</Typography>
  </Card>
);
