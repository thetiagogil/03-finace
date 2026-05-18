import type { FinanceRecord, RecordMode, RecordType } from "../types";

export const isRecordType = (value: unknown): value is RecordType =>
  value === "income" || value === "expense";

export const isRecordMode = (value: unknown): value is RecordMode =>
  value === "tracked" || value === "planned";

export const normalizeRecord = (value: unknown): FinanceRecord | null => {
  if (!value || typeof value !== "object") return null;

  const record = value as Partial<FinanceRecord>;

  if (typeof record.id !== "string") return null;
  if (!isRecordType(record.type)) return null;
  if (!isRecordMode(record.mode)) return null;
  if (typeof record.category !== "string") return null;
  if (typeof record.amount !== "number" || !Number.isFinite(record.amount)) {
    return null;
  }
  if (typeof record.date !== "string") return null;
  if (typeof record.createdAt !== "string") return null;

  return {
    id: record.id,
    type: record.type,
    mode: record.mode,
    category: record.category,
    subcategory:
      typeof record.subcategory === "string" ? record.subcategory : undefined,
    amount: record.amount,
    date: record.date,
    description:
      typeof record.description === "string" ? record.description : undefined,
    createdAt: record.createdAt,
  };
};
