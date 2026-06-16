import { Alert, DialogContent, Stack } from "@mui/material";
import type { RecordDialogController } from "../hooks/useRecordDialog";
import { RecordAmountDateFields } from "./RecordAmountDateFields";
import { RecordCategoryFields } from "./RecordCategoryFields";
import { RecordDescriptionField } from "./RecordDescriptionField";
import { RecordTypeModeFields } from "./RecordTypeModeFields";

interface RecordDialogContentProps {
  dialog: RecordDialogController;
}

export const RecordDialogContent = ({ dialog }: RecordDialogContentProps) => (
  <DialogContent sx={{ pt: 3 }}>
    <Stack spacing={2.5}>
      {dialog.saveError && <Alert severity="error">{dialog.saveError}</Alert>}
      <RecordTypeModeFields
        type={dialog.type}
        mode={dialog.mode}
        onTypeChange={dialog.setType}
        onModeChange={dialog.setMode}
      />
      <RecordCategoryFields
        category={dialog.category}
        subcategory={dialog.subcategory}
        categories={dialog.categories}
        categoryIsValid={dialog.categoryIsValid}
        onCategoryChange={dialog.setCategory}
        onSubcategoryChange={dialog.setSubcategory}
      />
      <RecordAmountDateFields
        amount={dialog.amount}
        date={dialog.date}
        amountIsValid={dialog.amountIsValid}
        dateIsValid={dialog.dateIsValid}
        onAmountChange={dialog.setAmount}
        onDateChange={dialog.setDate}
      />
      <RecordDescriptionField
        description={dialog.description}
        onDescriptionChange={dialog.setDescription}
      />
    </Stack>
  </DialogContent>
);
