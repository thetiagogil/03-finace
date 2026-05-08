import { useSyncExternalStore } from "react";
import { DEFAULT_CATEGORIES } from "../lib/constants/finance";
import { STORAGE_KEYS } from "../lib/constants/storageKeys";
import type { FinanceRecord, FinanceRecordInput, RecordType } from "../types/financeRecord";
import { getCurrentUser } from "./authService";
import { readStorage, writeStorage } from "./storageService";

type Listener = () => void;

const listeners = new Set<Listener>();
const cache = new Map<string, FinanceRecord[]>();
const emptyRecords: FinanceRecord[] = [];

const emit = () => listeners.forEach(listener => listener());

const getActiveUserId = () => getCurrentUser()?.id ?? "";

const activeRecordsKey = () => STORAGE_KEYS.recordsForUser(getActiveUserId());

const activeCategoriesKey = () => STORAGE_KEYS.categoriesForUser(getActiveUserId());

const write = (key: string, value: unknown) => {
  writeStorage(key, value);
  emit();
};

const isRecordType = (value: unknown): value is RecordType => value === "income" || value === "expense";

const normalizeRecord = (record: FinanceRecord): FinanceRecord | null => {
  if (!isRecordType(record.type)) return null;
  return {
    id: record.id,
    type: record.type,
    mode: record.mode,
    category: record.category,
    subcategory: record.subcategory,
    amount: record.amount,
    date: record.date,
    description: record.description,
    createdAt: record.createdAt
  };
};

const readRecords = (key: string) => {
  return readStorage<FinanceRecord[]>(key, []).map(normalizeRecord).filter((record): record is FinanceRecord => Boolean(record));
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
      const key = activeRecordsKey();
      const json = localStorage.getItem(key) ?? "[]";
      const cacheKey = `${key}:${json}`;
      const cached = cache.get(cacheKey);
      if (cached) return cached;
      const parsed = readRecords(key);
      cache.set(cacheKey, parsed);
      return parsed;
    },
    () => emptyRecords
  );
};

export const getRecordsForUser = (userId: string) => readRecords(STORAGE_KEYS.recordsForUser(userId));

export const replaceRecordsForUser = (userId: string, records: FinanceRecord[]) => {
  write(STORAGE_KEYS.recordsForUser(userId), records);
};

export const getRecords = () => readRecords(activeRecordsKey());

export const addRecord = (record: FinanceRecordInput) => {
  const nextRecord: FinanceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  write(activeRecordsKey(), [nextRecord, ...getRecords()]);
};

export const updateRecord = (id: string, patch: Partial<FinanceRecord>) => {
  write(
    activeRecordsKey(),
    getRecords().map(record => (record.id === id ? { ...record, ...patch } : record))
  );
};

export const deleteRecord = (id: string) => {
  write(activeRecordsKey(), getRecords().filter(record => record.id !== id));
};

export const clearAllRecords = () => {
  write(activeRecordsKey(), []);
};

export const getCategories = (type: RecordType) => {
  const custom = readStorage<Partial<Record<RecordType, string[]>>>(activeCategoriesKey(), {});
  return Array.from(new Set([...(DEFAULT_CATEGORIES[type] ?? []), ...(custom[type] ?? [])])).sort();
};

export const addCategory = (type: RecordType, name: string) => {
  const custom = readStorage<Partial<Record<RecordType, string[]>>>(activeCategoriesKey(), {});
  custom[type] = Array.from(new Set([...(custom[type] ?? []), name]));
  write(activeCategoriesKey(), custom);
};
