import { useMemo } from "react";
import { useRecords } from "../../../features/finance/hooks/useRecords";
import { getTrendSeries } from "../../../features/finance/lib/calculations";

export const useTrendsPage = () => {
  const records = useRecords();
  const monthly = useMemo(() => getTrendSeries(records), [records]);

  return {
    records,
    monthly,
    hasRecords: records.length > 0,
  };
};
