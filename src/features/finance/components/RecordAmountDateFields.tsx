import { Stack, TextField } from "@mui/material";

interface RecordAmountDateFieldsProps {
  amount: string;
  date: string;
  amountIsValid: boolean;
  dateIsValid: boolean;
  onAmountChange: (amount: string) => void;
  onDateChange: (date: string) => void;
}

export const RecordAmountDateFields = ({
  amount,
  date,
  amountIsValid,
  dateIsValid,
  onAmountChange,
  onDateChange,
}: RecordAmountDateFieldsProps) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <TextField
      label="Amount"
      type="number"
      value={amount}
      onChange={(event) => onAmountChange(event.target.value)}
      error={Boolean(amount) && !amountIsValid}
      helperText={
        Boolean(amount) && !amountIsValid ? "Enter a positive amount." : " "
      }
      slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
      fullWidth
    />
    <TextField
      label="Date"
      type="date"
      value={date}
      onChange={(event) => onDateChange(event.target.value)}
      error={Boolean(date) && !dateIsValid}
      helperText={Boolean(date) && !dateIsValid ? "Enter a valid date." : " "}
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
  </Stack>
);
