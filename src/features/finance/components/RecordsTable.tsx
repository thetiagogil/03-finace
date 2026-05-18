import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ConfirmAction } from "../../../shared/components/ui/ConfirmAction";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import { deleteRecord } from "../storage/finance-storage";
import type { FinanceRecord } from "../types";
import { getFinanceColor, getFinanceSoftColor } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import { RecordDialog } from "./RecordDialog";

interface RecordsTableProps {
  records: FinanceRecord[];
  emptyTitle: string;
  emptyDescription: string;
}

export const RecordsTable = ({
  records,
  emptyTitle,
  emptyDescription,
}: RecordsTableProps) => (
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
        {records.length === 0 ? (
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
          records.map((record) => (
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
              <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
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
                    borderColor: getFinanceColor(record.type, record.mode),
                    bgcolor: getFinanceSoftColor(record.type, record.mode),
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
                <Typography fontWeight={600}>{record.category}</Typography>
                {record.subcategory && (
                  <Typography variant="caption" color="text.secondary">
                    {record.subcategory}
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={{ color: "text.secondary", maxWidth: 280 }}>
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
                <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
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
);
