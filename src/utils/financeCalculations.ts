import type { FinanceRecord, ModeFilter, RecordKind, RecordMode } from "../models/finance";
import { periodMatches } from "./period";

export interface CategoryTotals {
  category: string;
  planned: number;
  tracked: number;
}

export const sumRecords = (records: FinanceRecord[], kind: RecordKind, mode: RecordMode) => {
  return records.filter(record => record.kind === kind && record.mode === mode).reduce((sum, record) => sum + record.amount, 0);
};

export const getRecordTotals = (records: FinanceRecord[]) => {
  const totals = records.reduce(
    (result, record) => ({
      income: result.income + (record.kind === "income" ? record.amount : 0),
      expense: result.expense + (record.kind === "expense" ? record.amount : 0)
    }),
    { income: 0, expense: 0 }
  );
  return { ...totals, net: totals.income - totals.expense };
};

export const getCategoryTotals = (records: FinanceRecord[]) => {
  const totals = new Map<string, { planned: number; tracked: number }>();
  records.forEach(record => {
    const current = totals.get(record.category) ?? { planned: 0, tracked: 0 };
    current[record.mode] += record.amount;
    totals.set(record.category, current);
  });
  return Array.from(totals.entries())
    .map(([category, values]) => ({ category, ...values }))
    .sort((a, b) => b.tracked - a.tracked);
};

export const getMonthlyNetSeries = (records: FinanceRecord[], baseDate = new Date(), months = 6) => {
  return Array.from({ length: months }, (_, index) => {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth() - (months - 1 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthItems = records.filter(record => record.date.startsWith(key));
    return {
      month: date.toLocaleString(undefined, { month: "short" }),
      planned: sumRecords(monthItems, "income", "planned") - sumRecords(monthItems, "expense", "planned"),
      tracked: sumRecords(monthItems, "income", "tracked") - sumRecords(monthItems, "expense", "tracked")
    };
  });
};

export const getFilteredRecords = (
  records: FinanceRecord[],
  filters: { year: number; month: string; mode: ModeFilter; kind: "all" | RecordKind; search: string }
) => {
  const inPeriod = periodMatches(filters.year, filters.month);
  const query = filters.search.trim().toLowerCase();
  return records
    .filter(record => inPeriod(record.date))
    .filter(record => (filters.mode === "both" ? true : record.mode === filters.mode))
    .filter(record => (filters.kind === "all" ? true : record.kind === filters.kind))
    .filter(record => {
      if (!query) return true;
      return record.category.toLowerCase().includes(query) || (record.subcategory ?? "").toLowerCase().includes(query) || (record.description ?? "").toLowerCase().includes(query);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
};

export const getCompareRows = (records: FinanceRecord[], kind: RecordKind, year: number, month: string) => {
  const inPeriod = periodMatches(year, month);
  const map = new Map<string, { planned: number; tracked: number }>();
  records.filter(record => record.kind === kind && inPeriod(record.date)).forEach(record => {
    const current = map.get(record.category) ?? { planned: 0, tracked: 0 };
    current[record.mode] += record.amount;
    map.set(record.category, current);
  });
  return Array.from(map.entries())
    .map(([category, value]) => ({ category, ...value, diff: value.tracked - value.planned, percent: value.planned ? (value.tracked / value.planned) * 100 : null }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
};

export const getTrendSeries = (records: FinanceRecord[]) => {
  const map = new Map<string, { month: string; incomePlanned: number; incomeTracked: number; expensePlanned: number; expenseTracked: number }>();
  records.forEach(record => {
    const key = record.date.slice(0, 7);
    const current = map.get(key) ?? { month: key, incomePlanned: 0, incomeTracked: 0, expensePlanned: 0, expenseTracked: 0 };
    if (record.kind === "income" && record.mode === "planned") current.incomePlanned += record.amount;
    if (record.kind === "income" && record.mode === "tracked") current.incomeTracked += record.amount;
    if (record.kind === "expense" && record.mode === "planned") current.expensePlanned += record.amount;
    if (record.kind === "expense" && record.mode === "tracked") current.expenseTracked += record.amount;
    map.set(key, current);
  });
  return Array.from(map.values())
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => ({
      ...item,
      label: new Date(`${item.month}-01`).toLocaleString(undefined, { month: "short", year: "2-digit" }),
      netPlanned: item.incomePlanned - item.expensePlanned,
      netTracked: item.incomeTracked - item.expenseTracked
    }));
};

export const getCategoryUsage = (records: FinanceRecord[], kind: RecordKind) => {
  const map = new Map<string, { count: number; total: number }>();
  records.filter(record => record.kind === kind).forEach(record => {
    const current = map.get(record.category) ?? { count: 0, total: 0 };
    current.count += 1;
    current.total += record.amount;
    map.set(record.category, current);
  });
  return map;
};

export const shownModes = (mode: ModeFilter): RecordMode[] => (mode === "both" ? ["planned", "tracked"] : [mode]);

export const emptyMonthTotals = () => Array.from({ length: 12 }, () => ({ planned: 0, tracked: 0 }));

export const buildCategoryMonthPivot = (records: FinanceRecord[], kind: RecordKind) => {
  const map = new Map<string, Array<{ planned: number; tracked: number }>>();
  records.filter(record => record.kind === kind).forEach(record => {
    if (!map.has(record.category)) map.set(record.category, emptyMonthTotals());
    const monthIndex = Number(record.date.slice(5, 7)) - 1;
    const cell = map.get(record.category)?.[monthIndex];
    if (cell) cell[record.mode] += record.amount;
  });
  return { categories: Array.from(map.keys()).sort(), map };
};

export const getNetMonthTotals = (records: FinanceRecord[]) => {
  const totals = emptyMonthTotals();
  records.forEach(record => {
    const monthIndex = Number(record.date.slice(5, 7)) - 1;
    totals[monthIndex][record.mode] += record.kind === "income" ? record.amount : -record.amount;
  });
  return totals;
};
