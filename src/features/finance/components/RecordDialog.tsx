import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { useRecordDialog } from "../hooks/useRecordDialog";
import {
  getFinanceColor,
  getFinanceSoftColor,
  getFinanceToggleSx,
  getModeColor,
  getModeSoftColor,
} from "../lib/colors";
import type { FinanceRecord, RecordMode, RecordType } from "../types";

interface RecordDialogProps {
  trigger: ReactNode;
  defaultType?: RecordType;
  defaultMode?: RecordMode;
  initialRecord?: FinanceRecord;
}

export const RecordDialog = ({
  trigger,
  defaultType = "income",
  defaultMode = "tracked",
  initialRecord,
}: RecordDialogProps) => {
  const dialog = useRecordDialog({ defaultType, defaultMode, initialRecord });

  return (
    <>
      <span onClick={dialog.openDialog}>{trigger}</span>
      <Dialog
        open={dialog.open}
        onClose={() => dialog.setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ pb: 0 }}>
          <Typography variant="h5" fontWeight={700}>
            {initialRecord ? "Edit record" : "New record"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capture income or expenses, planned or actual.
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack spacing={1} flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  Type
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={dialog.type}
                  onChange={(_, value: RecordType | null) =>
                    value && dialog.setType(value)
                  }
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
              </Stack>
              <Stack spacing={1} flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  Mode
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={dialog.mode}
                  onChange={(_, value: RecordMode | null) =>
                    value && dialog.setMode(value)
                  }
                >
                  <ToggleButton
                    value="tracked"
                    sx={getFinanceToggleSx(
                      getModeColor("tracked"),
                      getModeSoftColor("tracked"),
                    )}
                  >
                    Tracked
                  </ToggleButton>
                  <ToggleButton
                    value="planned"
                    sx={getFinanceToggleSx(
                      getModeColor("planned"),
                      getModeSoftColor("planned"),
                    )}
                  >
                    Planned
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={dialog.category}
                  onChange={(event) => dialog.setCategory(event.target.value)}
                >
                  {dialog.categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Subcategory"
                value={dialog.subcategory}
                onChange={(event) => dialog.setSubcategory(event.target.value)}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Amount"
                type="number"
                value={dialog.amount}
                onChange={(event) => dialog.setAmount(event.target.value)}
                fullWidth
              />
              <TextField
                label="Date"
                type="date"
                value={dialog.date}
                onChange={(event) => dialog.setDate(event.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              label="Description"
              value={dialog.description}
              onChange={(event) => dialog.setDescription(event.target.value)}
              multiline
              minRows={2}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => dialog.setOpen(false)} variant="text">
            Cancel
          </Button>
          <Button
            onClick={dialog.handleSubmit}
            variant="contained"
            disabled={!dialog.isValid}
          >
            {initialRecord ? "Save changes" : "Add record"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
