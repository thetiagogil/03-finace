import { useMemo, useState } from "react";
import { useRecords } from "../../../features/finance/hooks/useRecords";
import { getYearOptions } from "../../../features/finance/lib/period";
import type { ModeFilter } from "../../../features/finance/types";

export const useLedgerPage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [mode, setMode] = useState<ModeFilter>("tracked");

  const yearRecords = useMemo(
    () => records.filter((record) => record.date.startsWith(String(year))),
    [records, year],
  );

  return {
    years,
    year,
    mode,
    yearRecords,
    emptyTitle:
      records.length === 0 ? "No ledger data yet" : `No records in ${year}`,
    emptyDescription:
      records.length === 0
        ? "Create records first, then the ledger will group them by category and month."
        : "Choose another year or add records for this year to build the ledger view.",
    setYear,
    setMode,
  };
};
