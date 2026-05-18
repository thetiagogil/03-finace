import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { PeriodFilter } from "../../../features/finance/components/PeriodFilter";
import type { RecordType } from "../../../features/finance/types";

interface CompareHeaderControlsProps {
  year: number;
  month: string;
  years: number[];
  type: RecordType;
  onPeriodChange: (next: { year: number; month: string }) => void;
  onTypeChange: (type: RecordType) => void;
}

export const CompareHeaderControls = ({
  year,
  month,
  years,
  type,
  onPeriodChange,
  onTypeChange,
}: CompareHeaderControlsProps) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
    <PeriodFilter
      year={year}
      month={month}
      years={years}
      onChange={onPeriodChange}
    />
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>Type</InputLabel>
      <Select
        label="Type"
        value={type}
        onChange={(event) => onTypeChange(event.target.value as RecordType)}
      >
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expenses</MenuItem>
      </Select>
    </FormControl>
  </Stack>
);
