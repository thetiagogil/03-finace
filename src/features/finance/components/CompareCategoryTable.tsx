import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import type { CompareRow } from "../lib/calculations";
import { formatCurrency } from "../lib/formatters";
import type { RecordType } from "../types";

interface CompareCategoryTableProps {
  rows: CompareRow[];
  type: RecordType;
  emptyTitle: string;
  emptyDescription: string;
}

export const CompareCategoryTable = ({
  rows,
  type,
  emptyTitle,
  emptyDescription,
}: CompareCategoryTableProps) => (
  <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Category</TableCell>
          <TableCell align="right">Tracked</TableCell>
          <TableCell align="right">Planned</TableCell>
          <TableCell align="right">Diff</TableCell>
          <TableCell align="right">% of plan</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} sx={{ py: 3 }}>
              <EmptyState
                title={emptyTitle}
                description={emptyDescription}
                compact
                variant="plain"
              />
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => {
            const bad = type === "expense" ? row.diff > 0 : row.diff < 0;
            return (
              <TableRow key={row.category}>
                <TableCell sx={{ fontWeight: 700 }}>{row.category}</TableCell>
                <TableCell align="right">
                  {formatCurrency(row.tracked)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(row.planned)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: bad ? "error.main" : "success.main",
                    fontWeight: 700,
                  }}
                >
                  {row.diff >= 0 ? "+" : ""}
                  {formatCurrency(row.diff)}
                </TableCell>
                <TableCell align="right" sx={{ color: "text.secondary" }}>
                  {row.percent === null ? "-" : `${Math.round(row.percent)}%`}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </Card>
);
