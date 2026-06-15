import { useMemo, useState } from "react";
import { useRecords } from "../../../features/finance/hooks/useRecords";
import {
  getFilteredRecords,
  getRecordTotals,
} from "../../../features/finance/lib/calculations";
import {
  ALL_MONTHS,
  getPeriodLabel,
  getYearOptions,
} from "../../../features/finance/lib/period";
import type { ModeFilter, RecordType } from "../../../features/finance/types";

const defaultYear = () => new Date().getFullYear();
const defaultMonth = ALL_MONTHS;
const defaultMode: ModeFilter = "tracked";
const defaultType: "all" | RecordType = "all";
const defaultSearch = "";

export const useRecordsPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [mode, setMode] = useState<ModeFilter>(defaultMode);
  const [type, setType] = useState<"all" | RecordType>(defaultType);
  const [search, setSearch] = useState(defaultSearch);

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, { year, month, mode, type, search });
  }, [type, mode, month, records, search, year]);

  const totals = getRecordTotals(filteredRecords);
  const hasActiveFilters =
    year !== defaultYear() ||
    month !== defaultMonth ||
    mode !== defaultMode ||
    type !== defaultType ||
    search.trim() !== defaultSearch;

  const clearFilters = () => {
    setYear(defaultYear());
    setMonth(defaultMonth);
    setMode(defaultMode);
    setType(defaultType);
    setSearch(defaultSearch);
  };

  return {
    years,
    year,
    month,
    mode,
    type,
    search,
    filteredRecords,
    totals,
    hasActiveFilters,
    periodLabel: getPeriodLabel(year, month),
    emptyTitle:
      records.length === 0
        ? "No records yet"
        : "No records match these filters",
    emptyDescription:
      records.length === 0
        ? "Create your first planned or tracked record to start building your finance history."
        : "Adjust the period, type, mode, or search term to find matching records.",
    setMode,
    setType,
    setSearch,
    clearFilters,
    setPeriod: (next: { year: number; month: string }) => {
      setYear(next.year);
      setMonth(next.month);
    },
  };
};
