import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ConfirmAction } from "../components/ConfirmAction";
import { EmptyState } from "../components/EmptyState";
import type { RecordType } from "../types/financeRecord";
import {
  addCategory,
  clearAllRecords,
  getCategories,
  useRecords,
} from "../services/financeService";
import { getCategoryUsage } from "../lib/utils/financeCalculations";
import {
  getFinanceColor,
  getFinanceSoftColor,
  getFinanceToggleSx,
} from "../lib/utils/financeColors";
import { formatCurrency } from "../lib/utils/formatters";

export const CategoriesPage = () => {
  const records = useRecords();
  const [type, setType] = useState<RecordType>("income");
  const [name, setName] = useState("");
  const categories = getCategories(type);

  const usage = getCategoryUsage(records, type);
  const hasRecordsForType = usage.size > 0;

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    addCategory(type, trimmedName);
    setName("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
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
              Taxonomy
            </Typography>
            <Typography variant="h3">Categories</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Organize your income and expenses.
            </Typography>
          </Box>
          <ConfirmAction
            title="Reset all data?"
            description="This removes every local record for the current user. Categories stay available, but the records cannot be restored."
            confirmLabel="Reset data"
            onConfirm={clearAllRecords}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
            >
              Reset all data
            </Button>
          </ConfirmAction>
        </Stack>

        <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
          <Stack spacing={2}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={type}
              onChange={(_, value: RecordType | null) =>
                value && setType(value)
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  type === "income" ? "e.g. Royalties" : "e.g. Childcare"
                }
                fullWidth
                onKeyDown={(event) => event.key === "Enter" && handleAdd()}
              />
              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ minHeight: 40, px: 2.5 }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Card>

        {!hasRecordsForType && (
          <EmptyState
            title={`No ${type} records yet`}
            description={`The default ${type} categories are ready. Once you create records, their totals will appear below.`}
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
          {categories.map((category) => {
            const itemUsage = usage.get(category) ?? { count: 0, total: 0 };
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
                    color: getFinanceColor(type, "tracked"),
                    fontWeight: 700,
                  }}
                >
                  {formatCurrency(itemUsage.total)}
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
};
