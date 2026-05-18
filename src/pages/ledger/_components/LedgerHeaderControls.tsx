import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import type { ModeFilter } from "../../../features/finance/types";

interface LedgerHeaderControlsProps {
  year: number;
  years: number[];
  mode: ModeFilter;
  onYearChange: (year: number) => void;
  onModeChange: (mode: ModeFilter) => void;
}

export const LedgerHeaderControls = ({
  year,
  years,
  mode,
  onYearChange,
  onModeChange,
}: LedgerHeaderControlsProps) => (
  <Stack direction="row" spacing={1.5}>
    <FormControl size="small" sx={{ minWidth: 130 }}>
      <InputLabel>Year</InputLabel>
      <Select
        label="Year"
        value={String(year)}
        onChange={(event) => onYearChange(Number(event.target.value))}
      >
        {years.map((option) => (
          <MenuItem key={option} value={String(option)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small" sx={{ minWidth: 190 }}>
      <InputLabel>Mode</InputLabel>
      <Select
        label="Mode"
        value={mode}
        onChange={(event) => onModeChange(event.target.value as ModeFilter)}
      >
        <MenuItem value="tracked">Tracked only</MenuItem>
        <MenuItem value="planned">Planned only</MenuItem>
        <MenuItem value="both">Tracked & Planned</MenuItem>
      </Select>
    </FormControl>
  </Stack>
);
