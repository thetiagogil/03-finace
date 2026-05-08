import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ConfirmAction } from "../components/ConfirmAction";
import { EmptyState } from "../components/EmptyState";
import { PeriodFilter } from "../components/PeriodFilter";
import { RecordDialog } from "../components/RecordDialog";
import type { ModeFilter, RecordType } from "../types/financeRecord";
import { deleteRecord, useRecords } from "../services/financeService";
import {
  getFilteredRecords,
  getRecordTotals,
} from "../lib/utils/financeCalculations";
import {
  FINANCE_COLORS,
  getFinanceColor,
  getFinanceSoftColor,
} from "../lib/utils/financeColors";
import { formatCurrency } from "../lib/utils/formatters";
import { ALL_MONTHS, getPeriodLabel, getYearOptions } from "../lib/utils/period";

export const RecordsPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(ALL_MONTHS);
  const [mode, setMode] = useState<ModeFilter>("tracked");
  const [type, setType] = useState<"all" | RecordType>("all");
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, { year, month, mode, type, search });
  }, [type, mode, month, records, search, year]);

  const totals = getRecordTotals(filteredRecords);
  const emptyTitle =
    records.length === 0 ? "No records yet" : "No records match these filters";
  const emptyDescription =
    records.length === 0
      ? "Create your first planned or tracked record to start building your finance history."
      : "Adjust the period, type, mode, or search term to find matching records.";

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ md: "flex-end" }}
          spacing={3}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Records - {getPeriodLabel(year, month)}
            </Typography>
            <Typography variant="h3">Records</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Create, filter, edit, and review every planned or tracked
              movement.
            </Typography>
          </Box>
          <RecordDialog
            trigger={
              <Button variant="contained" startIcon={<AddIcon />}>
                New record
              </Button>
            }
          />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <Summary
            label="Total income"
            value={formatCurrency(totals.income)}
            color={FINANCE_COLORS.trackedIncome}
          />
          <Summary
            label="Total expense"
            value={formatCurrency(totals.expense)}
            color={FINANCE_COLORS.trackedExpense}
          />
          <Summary
            label="Net"
            value={formatCurrency(totals.net)}
            color={
              totals.net >= 0
                ? FINANCE_COLORS.trackedIncome
                : FINANCE_COLORS.trackedExpense
            }
          />
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Stack
            spacing={2}
            sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              alignItems={{ md: "flex-end" }}
            >
              <PeriodFilter
                year={year}
                month={month}
                years={years}
                onChange={(next) => {
                  setYear(next.year);
                  setMonth(next.month);
                }}
              />
              <FormControl size="small" sx={{ minWidth: 190 }}>
                <InputLabel>Mode</InputLabel>
                <Select
                  label="Mode"
                  value={mode}
                  onChange={(event) =>
                    setMode(event.target.value as ModeFilter)
                  }
                >
                  <MenuItem value="tracked">Tracked only</MenuItem>
                  <MenuItem value="planned">Planned only</MenuItem>
                  <MenuItem value="both">Tracked & Planned</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as "all" | RecordType)
                  }
                >
                  <MenuItem value="all">All types</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search category or description"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ "& tbody tr:last-of-type td": { borderBottom: 0 } }}>
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
                    <TableCell colSpan={7} sx={{ py: 3 }}>
                      <EmptyState
                        title={emptyTitle}
                        description={emptyDescription}
                        compact
                        variant="plain"
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      hover
                      sx={{
                        "& td": {
                          borderBottom: "1px solid",
                          borderColor: "divider",
                        },
                      }}
                    >
                      <TableCell
                        sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                      >
                        {new Date(record.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="outlined"
                          label={record.type}
                          sx={{
                            color: getFinanceColor(record.type, record.mode),
                            borderColor: getFinanceColor(
                              record.type,
                              record.mode,
                            ),
                            bgcolor: getFinanceSoftColor(
                              record.type,
                              record.mode,
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: getFinanceColor(record.type, record.mode),
                            fontWeight: record.mode === "tracked" ? 700 : 500,
                          }}
                        >
                          {record.mode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>
                          {record.category}
                        </Typography>
                        {record.subcategory && (
                          <Typography variant="caption" color="text.secondary">
                            {record.subcategory}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ color: "text.secondary", maxWidth: 280 }}
                      >
                        {record.description || "-"}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: getFinanceColor(record.type, record.mode),
                          fontWeight: 700,
                        }}
                      >
                        {record.type === "income" ? "+" : "-"}
                        {formatCurrency(record.amount)}
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={0.5}
                        >
                          <RecordDialog
                            initialRecord={record}
                            trigger={
                              <IconButton size="small">
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            }
                          />
                          <ConfirmAction
                            title="Delete record?"
                            description="This record will be permanently removed from your local data."
                            confirmLabel="Delete"
                            onConfirm={() => deleteRecord(record.id)}
                          >
                            <IconButton size="small" color="error">
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </ConfirmAction>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
};

const Summary = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
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
