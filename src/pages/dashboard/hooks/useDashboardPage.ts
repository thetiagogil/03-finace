import { useRecords } from "../../../features/finance/hooks/useRecords";

export const useDashboardPage = () => {
  const records = useRecords();
  const currentDate = new Date();

  return {
    records,
    currentDate,
    hasRecords: records.length > 0,
  };
};
