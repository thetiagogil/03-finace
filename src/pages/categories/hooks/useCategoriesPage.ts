import { useRecords } from "../../../features/finance/hooks/useRecords";

export const useCategoriesPage = () => {
  const records = useRecords();

  return { records };
};
