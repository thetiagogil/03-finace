import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import type { FinanceRecord, ModeFilter, RecordType } from "../types/financeRecord";
import { useRecords } from "../services/financeService";
import {
  buildCategoryMonthPivot,
  emptyMonthTotals,
  getNetMonthTotals,
  shownModes,
} from "../lib/utils/financeCalculations";
import { FINANCE_COLORS, getFinanceColor } from "../lib/utils/financeColors";
import { formatCurrency } from "../lib/utils/formatters";
import { getYearOptions, MONTH_LABELS } from "../lib/utils/period";

export const LedgerPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [mode, setMode] = useState<ModeFilter>("tracked");
  const yearRecords = useMemo(
    () => records.filter((record) => record.date.startsWith(String(year))),
    [records, year],
  );
  const emptyTitle =
    records.length === 0 ? "No ledger data yet" : `No records in ${year}`;
  const emptyDescription =
    records.length === 0
      ? "Create records first, then the ledger will group them by category and month."
      : "Choose another year or add records for this year to build the ledger view.";

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
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
              Ledger - {year}
            </Typography>
            <Typography variant="h3">Ledger</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Review income, expenses, and net totals by category across the
              year.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Year</InputLabel>
              <Select
                label="Year"
                value={String(year)}
                onChange={(event) => setYear(Number(event.target.value))}
              >
                {years.map((option) => (
                  <MenuItem key={option} value={String(option)}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 190 }}>
              <InputLabel>Mode</InputLabel>
              <Select
                label="Mode"
                value={mode}
                onChange={(event) => setMode(event.target.value as ModeFilter)}
              >
                <MenuItem value="tracked">Tracked only</MenuItem>
                <MenuItem value="planned">Planned only</MenuItem>
                <MenuItem value="both">Tracked & Planned</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        {yearRecords.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <>
            <PivotSection
              title="Income"
              type="income"
              records={yearRecords}
              mode={mode}
            />
            <PivotSection
              title="Expenses"
              type="expense"
              records={yearRecords}
              mode={mode}
            />
            <NetSection records={yearRecords} mode={mode} />
          </>
        )}
      </Stack>
    </Container>
  );
};

const PivotSection = ({
  title,
  type,
  records,
  mode,
}: {
  title: string;
  type: RecordType;
  records: FinanceRecord[];
  mode: ModeFilter;
}) => {
  const data = buildCategoryMonthPivot(records, type);
  const modes = shownModes(mode);

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: "rgba(105,117,138,0.10)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {data.categories.length} categories
        </Typography>
      </Stack>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 180 }}>Category</TableCell>
              {mode === "both" && <TableCell>Mode</TableCell>}
              {MONTH_LABELS.map((label) => (
                <TableCell key={label} align="right">
                  {label.slice(0, 3)}
                </TableCell>
              ))}
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={15} sx={{ py: 3 }}>
                  <EmptyState
                    title={`No ${title.toLowerCase()} in this year`}
                    description={`Add ${type} records to populate this ledger section.`}
                    compact
                    variant="plain"
                  />
                </TableCell>
              </TableRow>
            ) : (
              data.categories.flatMap((category) =>
                modes.map((currentMode, index) => {
                  const values = data.map.get(category) ?? emptyMonthTotals();
                  const total = values.reduce(
                    (sum, cell) => sum + cell[currentMode],
                    0,
                  );
                  return (
                    <TableRow key={`${category}-${currentMode}`}>
                      {index === 0 && (
                        <TableCell
                          rowSpan={modes.length}
                          sx={{ fontWeight: 700 }}
                        >
                          {category}
                        </TableCell>
                      )}
                      {mode === "both" && (
                        <TableCell>
                          <Typography
                            variant="caption"
                            sx={{
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              color: getFinanceColor(type, currentMode),
                              fontWeight: currentMode === "tracked" ? 700 : 500,
                            }}
                          >
                            {currentMode}
                          </Typography>
                        </TableCell>
                      )}
                      {values.map((cell, monthIndex) => (
                        <TableCell
                          key={monthIndex}
                          align="right"
                          sx={{
                            color: cell[currentMode]
                              ? getFinanceColor(type, currentMode)
                              : "text.disabled",
                          }}
                        >
                          {cell[currentMode]
                            ? formatCurrency(cell[currentMode])
                            : "-"}
                        </TableCell>
                      ))}
                      <TableCell
                        align="right"
                        sx={{
                          color: getFinanceColor(type, currentMode),
                          fontWeight: 700,
                        }}
                      >
                        {formatCurrency(total)}
                      </TableCell>
                    </TableRow>
                  );
                }),
              )
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

const NetSection = ({
  records,
  mode,
}: {
  records: FinanceRecord[];
  mode: ModeFilter;
}) => {
  const modes = shownModes(mode);
  const net = getNetMonthTotals(records);

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: "rgba(105,117,138,0.10)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Net
        </Typography>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 180 }}>Mode</TableCell>
              {MONTH_LABELS.map((label) => (
                <TableCell key={label} align="right">
                  {label.slice(0, 3)}
                </TableCell>
              ))}
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modes.map((currentMode) => {
              const total = net.reduce(
                (sum, cell) => sum + cell[currentMode],
                0,
              );
              return (
                <TableRow key={currentMode}>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                      }}
                    >
                      {currentMode}
                    </Typography>
                  </TableCell>
                  {net.map((cell, index) => (
                    <TableCell
                      key={index}
                      align="right"
                      sx={{
                        color:
                          cell[currentMode] >= 0
                            ? FINANCE_COLORS.trackedIncome
                            : FINANCE_COLORS.trackedExpense,
                      }}
                    >
                      {cell[currentMode]
                        ? formatCurrency(cell[currentMode])
                        : "-"}
                    </TableCell>
                  ))}
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        total >= 0
                          ? FINANCE_COLORS.trackedIncome
                          : FINANCE_COLORS.trackedExpense,
                      fontWeight: 700,
                    }}
                  >
                    {formatCurrency(total)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};
