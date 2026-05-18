import type { RecordType, RecordMode } from "../types";

export const FINANCE_COLORS = {
  trackedIncome: "#2f9d68",
  trackedIncomeSoft: "rgba(47,157,104,0.10)",
  trackedExpense: "#c44a36",
  trackedExpenseMuted: "#d79a90",
  trackedExpenseSoft: "rgba(196,74,54,0.10)",
  plannedIncome: "#7f9fdc",
  plannedIncomeSoft: "rgba(127,159,220,0.12)",
  plannedExpense: "#7a5ab8",
  plannedExpenseSoft: "rgba(122,90,184,0.10)",
} as const;

export const getFinanceColor = (type: RecordType, mode: RecordMode) => {
  if (type === "income")
    return mode === "tracked"
      ? FINANCE_COLORS.trackedIncome
      : FINANCE_COLORS.plannedIncome;
  return mode === "tracked"
    ? FINANCE_COLORS.trackedExpense
    : FINANCE_COLORS.plannedExpense;
};

export const getFinanceSoftColor = (type: RecordType, mode: RecordMode) => {
  if (type === "income")
    return mode === "tracked"
      ? FINANCE_COLORS.trackedIncomeSoft
      : FINANCE_COLORS.plannedIncomeSoft;
  return mode === "tracked"
    ? FINANCE_COLORS.trackedExpenseSoft
    : FINANCE_COLORS.plannedExpenseSoft;
};

export const getModeColor = (mode: RecordMode) =>
  mode === "tracked"
    ? FINANCE_COLORS.trackedIncome
    : FINANCE_COLORS.plannedIncome;

export const getModeSoftColor = (mode: RecordMode) =>
  mode === "tracked"
    ? FINANCE_COLORS.trackedIncomeSoft
    : FINANCE_COLORS.plannedIncomeSoft;

export const getFinanceToggleSx = (color: string, backgroundColor: string) => ({
  "&.Mui-selected": {
    color,
    backgroundColor,
    borderColor: color,
    "&:hover": {
      backgroundColor,
    },
  },
});
