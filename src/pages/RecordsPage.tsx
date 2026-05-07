import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Card, Chip, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { ConfirmAction } from "../components/ConfirmAction";
import { PeriodFilter } from "../components/PeriodFilter";
import { RecordDialog } from "../components/RecordDialog";
import type { ModeFilter, RecordKind } from "../models/finance";
import { deleteRecord, useRecords } from "../services/financeService";
import { getFilteredRecords, getRecordTotals } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatters";
import { allMonths, getPeriodLabel, getYearOptions } from "../utils/period";

export const RecordsPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(allMonths);
  const [mode, setMode] = useState<ModeFilter>("both");
  const [kind, setKind] = useState<"all" | RecordKind>("all");
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, { year, month, mode, kind, search });
  }, [kind, mode, month, records, search, year]);

  const totals = getRecordTotals(filteredRecords);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>
              Records - {getPeriodLabel(year, month)}
            </Typography>
            <Typography variant="h3">All movements</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Every line of your financial story.</Typography>
          </Box>
          <RecordDialog trigger={<Button variant="contained" startIcon={<AddIcon />}>New record</Button>} />
        </Stack>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
          <Summary label="Total income" value={formatCurrency(totals.income)} color="success.main" />
          <Summary label="Total expense" value={formatCurrency(totals.expense)} color="error.main" />
          <Summary label="Net" value={formatCurrency(totals.net)} color={totals.net >= 0 ? "success.main" : "error.main"} />
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Stack spacing={2} sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ md: "flex-end" }}>
              <PeriodFilter year={year} month={month} years={years} onChange={next => { setYear(next.year); setMonth(next.month); }} />
              <FormControl size="small" sx={{ minWidth: 190 }}>
                <InputLabel>Mode</InputLabel>
                <Select label="Mode" value={mode} onChange={event => setMode(event.target.value as ModeFilter)}>
                  <MenuItem value="both">Planned & Tracked</MenuItem>
                  <MenuItem value="planned">Planned only</MenuItem>
                  <MenuItem value="tracked">Tracked only</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select label="Type" value={kind} onChange={event => setKind(event.target.value as "all" | RecordKind)}>
                  <MenuItem value="all">All types</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              size="small"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search category or description"
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            />
          </Stack>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>No records match your filters.</TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map(record => (
                    <TableRow key={record.id} hover>
                      <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>{new Date(record.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</TableCell>
                      <TableCell><Chip size="small" variant="outlined" label={record.kind} color={record.kind === "income" ? "success" : "error"} /></TableCell>
                      <TableCell><Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: "0.12em", color: record.mode === "planned" ? "#5a75bd" : "text.primary", fontWeight: record.mode === "tracked" ? 700 : 500 }}>{record.mode}</Typography></TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>{record.category}</Typography>
                        {record.subcategory && <Typography variant="caption" color="text.secondary">{record.subcategory}</Typography>}
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", maxWidth: 280 }}>{record.description || "-"}</TableCell>
                      <TableCell align="right" sx={{ color: record.kind === "income" ? "success.main" : "error.main", fontWeight: 700 }}>{record.kind === "income" ? "+" : "-"}{formatCurrency(record.amount)}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <RecordDialog initialRecord={record} trigger={<IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton>} />
                          <ConfirmAction title="Delete record?" description="This record will be permanently removed from your local data." confirmLabel="Delete" onConfirm={() => deleteRecord(record.id)}>
                            <IconButton size="small" color="error"><DeleteOutlineIcon fontSize="small" /></IconButton>
                          </ConfirmAction>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              {filteredRecords.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} align="right">Net for period</TableCell>
                    <TableCell align="right" sx={{ color: totals.net >= 0 ? "success.main" : "error.main", fontWeight: 700 }}>{formatCurrency(totals.net)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
};

const Summary = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
    <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.16em" }}>{label}</Typography>
    <Typography variant="h4" sx={{ mt: 1, color, fontWeight: 700 }}>{value}</Typography>
  </Card>
);
