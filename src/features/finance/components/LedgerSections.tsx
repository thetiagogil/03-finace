import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import {
  buildCategoryMonthPivot,
  emptyMonthTotals,
  getNetMonthTotals,
  shownModes,
} from "../lib/calculations";
import { FINANCE_COLORS, getFinanceColor } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import { MONTH_LABELS } from "../lib/period";
import type { FinanceRecord, ModeFilter, RecordType } from "../types";

interface LedgerPivotSectionProps {
  title: string;
  type: RecordType;
  records: FinanceRecord[];
  mode: ModeFilter;
}

export const LedgerPivotSection = ({
  title,
  type,
  records,
  mode,
}: LedgerPivotSectionProps) => {
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

export const LedgerNetSection = ({
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
