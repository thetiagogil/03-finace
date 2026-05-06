import type { FinanceRecord } from "../models/finance";

export const allMonths = "all";

export const monthLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getYearOptions = (records: FinanceRecord[]) => {
  const years = new Set<number>();
  records.forEach(record => years.add(Number(record.date.slice(0, 4))));
  years.add(new Date().getFullYear());
  return Array.from(years).sort((a, b) => b - a);
};

export const periodMatches = (year: number, month: string) => {
  return (date: string) => {
    if (!date.startsWith(String(year))) return false;
    if (month === allMonths) return true;
    return date.slice(5, 7) === month;
  };
};

export const getPeriodLabel = (year: number, month: string) => {
  if (month === allMonths) return String(year);
  return `${monthLabels[Number(month) - 1]} ${year}`;
};
