import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { ALL_MONTHS, MONTH_LABELS } from "../lib/utils/period";

interface PeriodFilterProps {
  year: number;
  month: string;
  years: number[];
  onChange: (next: { year: number; month: string }) => void;
}

export const PeriodFilter = ({ year, month, years, onChange }: PeriodFilterProps) => {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
      <FormControl size="small" sx={{ minWidth: 132 }}>
        <InputLabel>Year</InputLabel>
        <Select label="Year" value={String(year)} onChange={event => onChange({ year: Number(event.target.value), month })}>
          {years.map(option => (
            <MenuItem key={option} value={String(option)}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 176 }}>
        <InputLabel>Month</InputLabel>
        <Select label="Month" value={month} onChange={event => onChange({ year, month: event.target.value })}>
          <MenuItem value={ALL_MONTHS}>Whole year</MenuItem>
          {MONTH_LABELS.map((label, index) => {
            const value = String(index + 1).padStart(2, "0");
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};
