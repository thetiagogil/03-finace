import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, Card, Container, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import type { RecordKind } from "../models/finance";
import { addCategory, clearAllRecords, formatCurrency, getCategories, useEnsureSeed, useRecords } from "../services/financeService";

export const CategoriesPage = () => {
  useEnsureSeed();
  const records = useRecords();
  const [kind, setKind] = useState<RecordKind>("expense");
  const [name, setName] = useState("");
  const categories = getCategories(kind);

  const usage = useMemo(() => {
    const map = new Map<string, { count: number; total: number }>();
    records.filter(record => record.kind === kind).forEach(record => {
      const current = map.get(record.category) ?? { count: 0, total: 0 };
      current.count += 1;
      current.total += record.amount;
      map.set(record.category, current);
    });
    return map;
  }, [kind, records]);

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    addCategory(kind, trimmedName);
    setName("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "flex-end" }} spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.2em" }}>Taxonomy</Typography>
            <Typography variant="h3">Categories</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Organize your income and expenses.</Typography>
          </Box>
          <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} onClick={clearAllRecords}>Reset all data</Button>
        </Stack>

        <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <ToggleButtonGroup exclusive value={kind} onChange={(_, value: RecordKind | null) => value && setKind(value)} sx={{ alignSelf: "flex-start" }}>
              <ToggleButton value="income" color="success">Income</ToggleButton>
              <ToggleButton value="expense" color="error">Expense</ToggleButton>
            </ToggleButtonGroup>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "flex-end" }}>
              <TextField label="Add a new category" value={name} onChange={event => setName(event.target.value)} placeholder={kind === "income" ? "e.g. Royalties" : "e.g. Childcare"} fullWidth onKeyDown={event => event.key === "Enter" && handleAdd()} />
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add</Button>
            </Stack>
          </Stack>
        </Card>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2 }}>
          {categories.map(category => {
            const itemUsage = usage.get(category) ?? { count: 0, total: 0 };
            return (
              <Card key={category} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={700}>{category}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>{itemUsage.count} records</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1, color: kind === "income" ? "success.main" : "error.main", fontWeight: 700 }}>{formatCurrency(itemUsage.total)}</Typography>
              </Card>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
};
