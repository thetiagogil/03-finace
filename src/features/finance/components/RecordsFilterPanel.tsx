import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import type { ReactNode } from "react";
import type { ModeFilter, RecordType } from "../types";
import { PeriodFilter } from "./PeriodFilter";

interface RecordsFilterPanelProps {
  year: number;
  month: string;
  years: number[];
  mode: ModeFilter;
  type: "all" | RecordType;
  search: string;
  onPeriodChange: (next: { year: number; month: string }) => void;
  onModeChange: (mode: ModeFilter) => void;
  onTypeChange: (type: "all" | RecordType) => void;
  onSearchChange: (search: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  children: ReactNode;
}

export const RecordsFilterPanel = ({
  year,
  month,
  years,
  mode,
  type,
  search,
  onPeriodChange,
  onModeChange,
  onTypeChange,
  onSearchChange,
  hasActiveFilters,
  onClearFilters,
  children,
}: RecordsFilterPanelProps) => (
  <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
    <Stack
      spacing={2}
      sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        alignItems={{ md: "flex-end" }}
      >
        <PeriodFilter
          year={year}
          month={month}
          years={years}
          onChange={onPeriodChange}
        />
        <FormControl size="small" sx={{ width: { xs: "100%", sm: 190 } }}>
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
        <FormControl size="small" sx={{ width: { xs: "100%", sm: 150 } }}>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={type}
            onChange={(event) =>
              onTypeChange(event.target.value as "all" | RecordType)
            }
          >
            <MenuItem value="all">All types</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          size="small"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search category, subcategory, or description"
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="button"
          variant="outlined"
          startIcon={<FilterAltOffOutlinedIcon />}
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          sx={{ flexShrink: 0, alignSelf: { sm: "stretch" } }}
        >
          Clear filters
        </Button>
      </Stack>
    </Stack>
    {children}
  </Card>
);
