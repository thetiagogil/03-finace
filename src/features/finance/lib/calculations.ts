import type {
  FinanceRecord,
  ModeFilter,
  RecordType,
  RecordMode,
} from "../types";
import { periodMatches } from "./period";

export interface CategoryTotals {
  category: string;
  planned: number;
  tracked: number;
}

export interface PlanTrackTotals {
  incomePlan: number;
  incomeTrack: number;
  expensePlan: number;
  expenseTrack: number;
  netPlan: number;
  netTrack: number;
}

export interface CompareRow {
  category: string;
  planned: number;
  tracked: number;
  diff: number;
  percent: number | null;
}

export interface TrendPoint {
  label: string;
  month: string;
  incomePlanned: number;
  incomeTracked: number;
  expensePlanned: number;
  expenseTracked: number;
  netPlanned: number;
  netTracked: number;
}

export const sumRecords = (
  records: FinanceRecord[],
  type: RecordType,
  mode: RecordMode,
) => {
  return records
    .filter((record) => record.type === type && record.mode === mode)
    .reduce((sum, record) => sum + record.amount, 0);
};

export const getRecordTotals = (records: FinanceRecord[]) => {
  const totals = records.reduce(
    (result, record) => ({
      income: result.income + (record.type === "income" ? record.amount : 0),
      expense: result.expense + (record.type === "expense" ? record.amount : 0),
    }),
    { income: 0, expense: 0 },
  );
  return { ...totals, net: totals.income - totals.expense };
};

export const getCategoryTotals = (records: FinanceRecord[]) => {
  const totals = new Map<string, { planned: number; tracked: number }>();
  records.forEach((record) => {
    const current = totals.get(record.category) ?? { planned: 0, tracked: 0 };
    current[record.mode] += record.amount;
    totals.set(record.category, current);
  });
  return Array.from(totals.entries())
    .map(([category, values]) => ({ category, ...values }))
    .sort((a, b) => b.tracked - a.tracked);
};

export const getMonthKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const getRecordsForMonth = (
  records: FinanceRecord[],
  date = new Date(),
) => {
  const monthKey = getMonthKey(date);
  return records.filter((record) => record.date.startsWith(monthKey));
};

export const getPlanTrackTotals = (
  records: FinanceRecord[],
): PlanTrackTotals => {
  const incomePlan = sumRecords(records, "income", "planned");
  const incomeTrack = sumRecords(records, "income", "tracked");
  const expensePlan = sumRecords(records, "expense", "planned");
  const expenseTrack = sumRecords(records, "expense", "tracked");

  return {
    incomePlan,
    incomeTrack,
    expensePlan,
    expenseTrack,
    netPlan: incomePlan - expensePlan,
    netTrack: incomeTrack - expenseTrack,
  };
};

export const getMonthlyNetSeries = (
  records: FinanceRecord[],
  baseDate = new Date(),
  months = 6,
) => {
  return Array.from({ length: months }, (_, index) => {
    const date = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() - (months - 1 - index),
      1,
    );
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthItems = records.filter((record) => record.date.startsWith(key));
    return {
      month: date.toLocaleString(undefined, { month: "short" }),
      planned:
        sumRecords(monthItems, "income", "planned") -
        sumRecords(monthItems, "expense", "planned"),
      tracked:
        sumRecords(monthItems, "income", "tracked") -
        sumRecords(monthItems, "expense", "tracked"),
    };
  });
};

export const getFilteredRecords = (
  records: FinanceRecord[],
  filters: {
    year: number;
    month: string;
    mode: ModeFilter;
    type: "all" | RecordType;
    search: string;
  },
) => {
  const inPeriod = periodMatches(filters.year, filters.month);
  const query = filters.search.trim().toLowerCase();
  return records
    .filter((record) => inPeriod(record.date))
    .filter((record) =>
      filters.mode === "both" ? true : record.mode === filters.mode,
    )
    .filter((record) =>
      filters.type === "all" ? true : record.type === filters.type,
    )
    .filter((record) => {
      if (!query) return true;
      return (
        record.category.toLowerCase().includes(query) ||
        (record.subcategory ?? "").toLowerCase().includes(query) ||
        (record.description ?? "").toLowerCase().includes(query)
      );
    })
    .sort((a, b) => b.date.localeCompare(a.date));
};

export const getCompareRows = (
  records: FinanceRecord[],
  type: RecordType,
  year: number,
  month: string,
): CompareRow[] => {
  const inPeriod = periodMatches(year, month);
  const map = new Map<string, { planned: number; tracked: number }>();
  records
    .filter((record) => record.type === type && inPeriod(record.date))
    .forEach((record) => {
      const current = map.get(record.category) ?? { planned: 0, tracked: 0 };
      current[record.mode] += record.amount;
      map.set(record.category, current);
    });
  return Array.from(map.entries())
    .map(([category, value]) => ({
      category,
      ...value,
      diff: value.tracked - value.planned,
      percent: value.planned ? (value.tracked / value.planned) * 100 : null,
    }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
};

export const getTrendSeries = (records: FinanceRecord[]): TrendPoint[] => {
  const map = new Map<
    string,
    {
      month: string;
      incomePlanned: number;
      incomeTracked: number;
      expensePlanned: number;
      expenseTracked: number;
    }
  >();
  records.forEach((record) => {
    const key = record.date.slice(0, 7);
    const current = map.get(key) ?? {
      month: key,
      incomePlanned: 0,
      incomeTracked: 0,
      expensePlanned: 0,
      expenseTracked: 0,
    };
    if (record.type === "income" && record.mode === "planned")
      current.incomePlanned += record.amount;
    if (record.type === "income" && record.mode === "tracked")
      current.incomeTracked += record.amount;
    if (record.type === "expense" && record.mode === "planned")
      current.expensePlanned += record.amount;
    if (record.type === "expense" && record.mode === "tracked")
      current.expenseTracked += record.amount;
    map.set(key, current);
  });
  return Array.from(map.values())
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      ...item,
      label: new Date(`${item.month}-01`).toLocaleString(undefined, {
        month: "short",
        year: "2-digit",
      }),
      netPlanned: item.incomePlanned - item.expensePlanned,
      netTracked: item.incomeTracked - item.expenseTracked,
    }));
};

export const getCategoryUsage = (
  records: FinanceRecord[],
  type: RecordType,
) => {
  const map = new Map<string, { count: number; total: number }>();
  records
    .filter((record) => record.type === type)
    .forEach((record) => {
      const current = map.get(record.category) ?? { count: 0, total: 0 };
      current.count += 1;
      current.total += record.amount;
      map.set(record.category, current);
    });
  return map;
};

export const shownModes = (mode: ModeFilter): RecordMode[] =>
  mode === "both" ? ["tracked", "planned"] : [mode];

export const emptyMonthTotals = () =>
  Array.from({ length: 12 }, () => ({ planned: 0, tracked: 0 }));

export const buildCategoryMonthPivot = (
  records: FinanceRecord[],
  type: RecordType,
) => {
  const map = new Map<string, Array<{ planned: number; tracked: number }>>();
  records
    .filter((record) => record.type === type)
    .forEach((record) => {
      if (!map.has(record.category))
        map.set(record.category, emptyMonthTotals());
      const monthIndex = Number(record.date.slice(5, 7)) - 1;
      const cell = map.get(record.category)?.[monthIndex];
      if (cell) cell[record.mode] += record.amount;
    });
  return { categories: Array.from(map.keys()).sort(), map };
};

export const getNetMonthTotals = (records: FinanceRecord[]) => {
  const totals = emptyMonthTotals();
  records.forEach((record) => {
    const monthIndex = Number(record.date.slice(5, 7)) - 1;
    totals[monthIndex][record.mode] +=
      record.type === "income" ? record.amount : -record.amount;
  });
  return totals;
};
