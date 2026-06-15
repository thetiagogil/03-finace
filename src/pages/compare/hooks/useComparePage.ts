import { useMemo, useState } from "react";
import { useRecords } from "../../../features/finance/hooks/useRecords";
import { getCompareRows } from "../../../features/finance/lib/calculations";
import {
  ALL_MONTHS,
  getPeriodLabel,
  getYearOptions,
} from "../../../features/finance/lib/period";
import type { RecordType } from "../../../features/finance/types";

export const useComparePage = () => {
  const records = useRecords();
  const years = getYearOptions(records);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(ALL_MONTHS);
  const [type, setType] = useState<RecordType>("income");

  const rows = useMemo(() => {
    return getCompareRows(records, type, year, month);
  }, [type, month, records, year]);

  const totals = rows.reduce(
    (sum, row) => ({
      planned: sum.planned + row.planned,
      tracked: sum.tracked + row.tracked,
    }),
    { planned: 0, tracked: 0 },
  );

  return {
    years,
    year,
    month,
    type,
    rows,
    largestVariance: rows[0] ?? null,
    totals,
    periodLabel: getPeriodLabel(year, month),
    riskCount:
      type === "expense"
        ? rows.filter((row) => row.diff > 0).length
        : rows.filter((row) => row.diff < 0).length,
    riskLabel:
      type === "expense" ? "Over budget categories" : "Under target categories",
    emptyTitle:
      records.length === 0
        ? "No records to compare"
        : `No ${type} records for this period`,
    emptyDescription:
      records.length === 0
        ? "Add planned and tracked records to compare your intentions against reality."
        : "Change the period or type filter, or add records for this selection.",
    setType,
    setPeriod: (next: { year: number; month: string }) => {
      setYear(next.year);
      setMonth(next.month);
    },
  };
};
