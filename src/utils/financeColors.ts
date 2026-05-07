import type { RecordKind, RecordMode } from "../models/finance";

export const financeColors = {
  trackedIncome: "#2f9d68",
  trackedIncomeSoft: "rgba(47,157,104,0.10)",
  trackedExpense: "#c44a36",
  trackedExpenseMuted: "#d79a90",
  trackedExpenseSoft: "rgba(196,74,54,0.10)",
  plannedIncome: "#7f9fdc",
  plannedIncomeSoft: "rgba(127,159,220,0.12)",
  plannedExpense: "#7a5ab8",
  plannedExpenseSoft: "rgba(122,90,184,0.10)"
} as const;

export const getFinanceColor = (kind: RecordKind, mode: RecordMode) => {
  if (kind === "income") return mode === "tracked" ? financeColors.trackedIncome : financeColors.plannedIncome;
  return mode === "tracked" ? financeColors.trackedExpense : financeColors.plannedExpense;
};

export const getFinanceSoftColor = (kind: RecordKind, mode: RecordMode) => {
  if (kind === "income") return mode === "tracked" ? financeColors.trackedIncomeSoft : financeColors.plannedIncomeSoft;
  return mode === "tracked" ? financeColors.trackedExpenseSoft : financeColors.plannedExpenseSoft;
};

export const getModeColor = (mode: RecordMode) => (mode === "tracked" ? financeColors.trackedIncome : financeColors.plannedIncome);

export const getModeSoftColor = (mode: RecordMode) => (mode === "tracked" ? financeColors.trackedIncomeSoft : financeColors.plannedIncomeSoft);

export const getFinanceToggleSx = (color: string, backgroundColor: string) => ({
  "&.Mui-selected": {
    color,
    backgroundColor,
    borderColor: color,
    "&:hover": {
      backgroundColor
    }
  }
});
