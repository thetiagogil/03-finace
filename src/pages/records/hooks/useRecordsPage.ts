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

export const useRecordsPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(ALL_MONTHS);
  const [mode, setMode] = useState<ModeFilter>("tracked");
  const [type, setType] = useState<"all" | RecordType>("all");
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, { year, month, mode, type, search });
  }, [type, mode, month, records, search, year]);

  const totals = getRecordTotals(filteredRecords);

  return {
    years,
    year,
    month,
    mode,
    type,
    search,
    filteredRecords,
    totals,
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
    setPeriod: (next: { year: number; month: string }) => {
      setYear(next.year);
      setMonth(next.month);
    },
  };
};
