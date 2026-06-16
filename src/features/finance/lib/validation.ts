import type { FinanceRecord, RecordMode, RecordType } from "../types";

export const isRecordType = (value: unknown): value is RecordType =>
  value === "income" || value === "expense";

export const isRecordMode = (value: unknown): value is RecordMode =>
  value === "tracked" || value === "planned";

export const isRecordAmount = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

export const isRecordDate = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
};

export const normalizeRecord = (value: unknown): FinanceRecord | null => {
  if (!value || typeof value !== "object") return null;

  const record = value as Partial<FinanceRecord>;

  if (typeof record.id !== "string") return null;
  if (!isRecordType(record.type)) return null;
  if (!isRecordMode(record.mode)) return null;
  if (typeof record.category !== "string") return null;
  if (!record.category.trim()) return null;
  if (!isRecordAmount(record.amount)) return null;
  if (!isRecordDate(record.date)) return null;
  if (typeof record.createdAt !== "string") return null;

  return {
    id: record.id,
    type: record.type,
    mode: record.mode,
    category: record.category.trim(),
    subcategory:
      typeof record.subcategory === "string" && record.subcategory.trim()
        ? record.subcategory.trim()
        : undefined,
    amount: record.amount,
    date: record.date,
    description:
      typeof record.description === "string" && record.description.trim()
        ? record.description.trim()
        : undefined,
    createdAt: record.createdAt,
  };
};
