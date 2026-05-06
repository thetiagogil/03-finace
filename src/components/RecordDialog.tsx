import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useMemo, useState, type ReactNode } from "react";
import type { FinanceRecord, RecordKind, RecordMode } from "../models/finance";
import { addRecord, getCategories, updateRecord } from "../services/financeService";

interface RecordDialogProps {
  trigger: ReactNode;
  defaultKind?: RecordKind;
  defaultMode?: RecordMode;
  initialRecord?: FinanceRecord;
}

const today = () => new Date().toISOString().slice(0, 10);

export const RecordDialog = ({ trigger, defaultKind = "expense", defaultMode = "tracked", initialRecord }: RecordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<RecordKind>(defaultKind);
  const [mode, setMode] = useState<RecordMode>(defaultMode);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [description, setDescription] = useState("");

  const categories = useMemo(() => getCategories(kind), [kind]);
  const isValid = Boolean(category && amount && Number(amount) > 0 && date);

  const openDialog = () => {
    if (initialRecord) {
      setKind(initialRecord.kind);
      setMode(initialRecord.mode);
      setCategory(initialRecord.category);
      setSubcategory(initialRecord.subcategory ?? "");
      setAmount(String(initialRecord.amount));
      setDate(initialRecord.date);
      setDescription(initialRecord.description ?? "");
    } else {
      setKind(defaultKind);
      setMode(defaultMode);
      setCategory("");
      setSubcategory("");
      setAmount("");
      setDate(today());
      setDescription("");
    }
    setOpen(true);
  };

  const handleSubmit = () => {
    const payload = {
      kind,
      mode,
      category,
      subcategory: subcategory || undefined,
      amount: Number(amount),
      date,
      description: description || undefined
    };
    if (initialRecord) {
      updateRecord(initialRecord.id, payload);
    } else {
      addRecord(payload);
    }
    setOpen(false);
  };

  return (
    <>
      <span onClick={openDialog}>{trigger}</span>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pb: 0 }}>
          <Typography variant="h5" fontWeight={700}>{initialRecord ? "Edit record" : "New record"}</Typography>
          <Typography variant="body2" color="text.secondary">Capture income or expenses, planned or actual.</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack spacing={1} flex={1}>
                <Typography variant="body2" fontWeight={600}>Type</Typography>
                <ToggleButtonGroup exclusive fullWidth value={kind} onChange={(_, value: RecordKind | null) => value && setKind(value)}>
                  <ToggleButton value="income" color="success">Income</ToggleButton>
                  <ToggleButton value="expense" color="error">Expense</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Stack spacing={1} flex={1}>
                <Typography variant="body2" fontWeight={600}>Mode</Typography>
                <ToggleButtonGroup exclusive fullWidth value={mode} onChange={(_, value: RecordMode | null) => value && setMode(value)}>
                  <ToggleButton value="planned">Planned</ToggleButton>
                  <ToggleButton value="tracked">Tracked</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" value={category} onChange={event => setCategory(event.target.value)}>
                  {categories.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Subcategory" value={subcategory} onChange={event => setSubcategory(event.target.value)} fullWidth />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Amount" type="number" value={amount} onChange={event => setAmount(event.target.value)} fullWidth />
              <TextField label="Date" type="date" value={date} onChange={event => setDate(event.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Stack>
            <TextField label="Description" value={description} onChange={event => setDescription(event.target.value)} multiline minRows={2} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)} variant="text">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!isValid}>{initialRecord ? "Save changes" : "Add record"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
