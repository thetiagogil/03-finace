import { useSyncExternalStore } from "react";
import type { FinanceRecord, RecordKind } from "../models/finance";
import { getCurrentUser, testUserId } from "./authService";

const recordsKeyPrefix = "finace.records";
const categoriesKeyPrefix = "finace.categories";

type Listener = () => void;

const listeners = new Set<Listener>();
const cache = new Map<string, FinanceRecord[]>();

const defaultCategories: Record<RecordKind, string[]> = {
  income: ["Salary", "Freelance", "Investments", "Side Project", "Other"],
  expense: ["Housing", "Groceries", "Transport", "Dining", "Utilities", "Subscriptions", "Health", "Entertainment", "Travel", "Shopping", "Other"]
};

const emit = () => listeners.forEach(listener => listener());

const getActiveUserId = () => getCurrentUser()?.id ?? "";

const recordsKey = (userId = getActiveUserId()) => `${recordsKeyPrefix}.${userId}.v1`;

const categoriesKey = (userId = getActiveUserId()) => `${categoriesKeyPrefix}.${userId}.v1`;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
};

const makeSeedRecord = (
  kind: RecordKind,
  mode: "planned" | "tracked",
  category: string,
  amount: number,
  day: number,
  monthOffset: number,
  description?: string
): FinanceRecord => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, day);
  return {
    id: crypto.randomUUID(),
    kind,
    mode,
    category,
    amount,
    date: date.toISOString().slice(0, 10),
    description,
    createdAt: new Date().toISOString()
  };
};

export const seedTestUserRecords = () => {
  const key = recordsKey(testUserId);
  const existingRecords = read<FinanceRecord[]>(key, []);
  if (existingRecords.length > 0) return;
  const records: FinanceRecord[] = [];
  for (let monthOffset = -5; monthOffset <= 0; monthOffset += 1) {
    records.push(makeSeedRecord("income", "planned", "Salary", 4200, 1, monthOffset));
    records.push(makeSeedRecord("income", "tracked", "Salary", 4200, 1, monthOffset));
    records.push(makeSeedRecord("income", "planned", "Freelance", 600, 15, monthOffset));
    records.push(makeSeedRecord("income", "tracked", "Freelance", monthOffset === 0 ? 320 : 800, 18, monthOffset));
    records.push(makeSeedRecord("expense", "planned", "Housing", 1400, 2, monthOffset));
    records.push(makeSeedRecord("expense", "tracked", "Housing", 1400, 2, monthOffset));
    records.push(makeSeedRecord("expense", "planned", "Groceries", 450, 6, monthOffset));
    records.push(makeSeedRecord("expense", "tracked", "Groceries", 480 + monthOffset * 20, 8, monthOffset));
    records.push(makeSeedRecord("expense", "planned", "Dining", 200, 10, monthOffset));
    records.push(makeSeedRecord("expense", "tracked", "Dining", 280 - monthOffset * 15, 12, monthOffset));
    records.push(makeSeedRecord("expense", "planned", "Transport", 120, 4, monthOffset));
    records.push(makeSeedRecord("expense", "tracked", "Transport", 95, 4, monthOffset));
    records.push(makeSeedRecord("expense", "planned", "Subscriptions", 60, 3, monthOffset));
    records.push(makeSeedRecord("expense", "tracked", "Subscriptions", 72, 3, monthOffset));
  }
  write(key, records);
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  const handleStorage = () => listener();
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

export const useRecords = () => {
  return useSyncExternalStore(
    subscribe,
    () => {
      const key = recordsKey();
      const json = localStorage.getItem(key) ?? "[]";
      const cacheKey = `${key}:${json}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;
      const parsed = JSON.parse(json) as FinanceRecord[];
      cache.set(cacheKey, parsed);
      return parsed;
    },
    () => []
  );
};

export const getRecords = () => read<FinanceRecord[]>(recordsKey(), []);

export const addRecord = (record: Omit<FinanceRecord, "id" | "createdAt">) => {
  const nextRecord: FinanceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  write(recordsKey(), [nextRecord, ...getRecords()]);
};

export const updateRecord = (id: string, patch: Partial<FinanceRecord>) => {
  write(
    recordsKey(),
    getRecords().map(record => (record.id === id ? { ...record, ...patch } : record))
  );
};

export const deleteRecord = (id: string) => {
  write(recordsKey(), getRecords().filter(record => record.id !== id));
};

export const clearAllRecords = () => {
  write(recordsKey(), []);
};

export const getCategories = (kind: RecordKind) => {
  const custom = read<Partial<Record<RecordKind, string[]>>>(categoriesKey(), {});
  return Array.from(new Set([...(defaultCategories[kind] ?? []), ...(custom[kind] ?? [])])).sort();
};

export const addCategory = (kind: RecordKind, name: string) => {
  const custom = read<Partial<Record<RecordKind, string[]>>>(categoriesKey(), {});
  custom[kind] = Array.from(new Set([...(custom[kind] ?? []), name]));
  write(categoriesKey(), custom);
};
