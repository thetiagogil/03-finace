import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import { useCategoryManager } from "../hooks/useCategoryManager";
import {
  getFinanceColor,
  getFinanceSoftColor,
  getFinanceToggleSx,
} from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import type { FinanceRecord, RecordType } from "../types";

interface CategoryManagerProps {
  records: FinanceRecord[];
}

export const CategoryManager = ({ records }: CategoryManagerProps) => {
  const manager = useCategoryManager(records);

  return (
    <>
      <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
        <Stack spacing={2}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={manager.type}
            onChange={(_, value: RecordType | null) =>
              value && manager.setType(value)
            }
            sx={{ alignSelf: "flex-start" }}
          >
            <ToggleButton
              value="income"
              sx={getFinanceToggleSx(
                getFinanceColor("income", "tracked"),
                getFinanceSoftColor("income", "tracked"),
              )}
            >
              Income
            </ToggleButton>
            <ToggleButton
              value="expense"
              sx={getFinanceToggleSx(
                getFinanceColor("expense", "tracked"),
                getFinanceSoftColor("expense", "tracked"),
              )}
            >
              Expense
            </ToggleButton>
          </ToggleButtonGroup>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ sm: "center" }}
          >
            <TextField
              size="small"
              label="Add a new category"
              value={manager.name}
              onChange={(event) => manager.setName(event.target.value)}
              placeholder={
                manager.type === "income" ? "e.g. Royalties" : "e.g. Childcare"
              }
              fullWidth
              onKeyDown={(event) =>
                event.key === "Enter" && manager.handleAdd()
              }
            />
            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={manager.handleAdd}
              sx={{ minHeight: 40, px: 2.5 }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Card>

      {!manager.hasRecordsForType && (
        <EmptyState
          title={`No ${manager.type} records yet`}
          description={`The default ${manager.type} categories are ready. Once you create records, their totals will appear below.`}
          compact
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {manager.categories.map((category) => {
          const itemUsage = manager.usage.get(category) ?? {
            count: 0,
            total: 0,
          };
          return (
            <Card
              key={category}
              variant="outlined"
              sx={{ p: 2.5, borderRadius: 3 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={700}>{category}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: "0.12em" }}
                >
                  {itemUsage.count} records
                </Typography>
              </Stack>
              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  color: getFinanceColor(manager.type, "tracked"),
                  fontWeight: 700,
                }}
              >
                {formatCurrency(itemUsage.total)}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </>
  );
};
