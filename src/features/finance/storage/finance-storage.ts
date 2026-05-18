import { getCurrentUser } from "../../auth/storage/auth-storage";
import { readStorage, writeStorage } from "../../../lib/storage";
import { STORAGE_KEYS } from "../../../lib/constants/storageKeys";
import { DEFAULT_CATEGORIES } from "../constants";
import { normalizeRecord } from "../lib/validation";
import type { FinanceRecord, FinanceRecordInput, RecordType } from "../types";

type Listener = () => void;

const listeners = new Set<Listener>();
const cache = new Map<string, FinanceRecord[]>();
const emptyRecords: FinanceRecord[] = [];

const emit = () => {
  cache.clear();
  listeners.forEach((listener) => listener());
};

const getActiveUserId = () => getCurrentUser()?.id ?? "";

const activeRecordsKey = () => STORAGE_KEYS.recordsForUser(getActiveUserId());

const activeCategoriesKey = () =>
  STORAGE_KEYS.categoriesForUser(getActiveUserId());

const write = (key: string, value: unknown) => {
  writeStorage(key, value);
  emit();
};

const readRecords = (key: string) => {
  const storedRecords = readStorage<unknown>(key, []);
  if (!Array.isArray(storedRecords)) return [];

  return storedRecords
    .map(normalizeRecord)
    .filter((record): record is FinanceRecord => Boolean(record));
};

const readCustomCategories = () => {
  const storedCategories = readStorage<unknown>(activeCategoriesKey(), {});
  if (!storedCategories || typeof storedCategories !== "object") return {};

  const categories = storedCategories as Partial<Record<RecordType, unknown>>;
  return {
    income: Array.isArray(categories.income)
      ? categories.income.filter(
          (category): category is string => typeof category === "string",
        )
      : [],
    expense: Array.isArray(categories.expense)
      ? categories.expense.filter(
          (category): category is string => typeof category === "string",
        )
      : [],
  } satisfies Record<RecordType, string[]>;
};

export const subscribeToFinanceStorage = (listener: Listener) => {
  listeners.add(listener);
  const handleStorage = () => {
    cache.clear();
    listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

export const getRecordsSnapshot = () => {
  const key = activeRecordsKey();
  const json = localStorage.getItem(key) ?? "[]";
  const cacheKey = `${key}:${json}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const parsed = readRecords(key);
  cache.set(cacheKey, parsed);
  return parsed;
};

export const getEmptyRecordsSnapshot = () => {
  return emptyRecords;
};

export const getRecordsForUser = (userId: string) =>
  readRecords(STORAGE_KEYS.recordsForUser(userId));

export const replaceRecordsForUser = (
  userId: string,
  records: FinanceRecord[],
) => {
  write(STORAGE_KEYS.recordsForUser(userId), records);
};

export const getRecords = () => readRecords(activeRecordsKey());

export const addRecord = (record: FinanceRecordInput) => {
  const nextRecord: FinanceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write(activeRecordsKey(), [nextRecord, ...getRecords()]);
};

export const updateRecord = (id: string, patch: Partial<FinanceRecord>) => {
  write(
    activeRecordsKey(),
    getRecords().map((record) =>
      record.id === id ? { ...record, ...patch } : record,
    ),
  );
};

export const deleteRecord = (id: string) => {
  write(
    activeRecordsKey(),
    getRecords().filter((record) => record.id !== id),
  );
};

export const clearAllRecords = () => {
  write(activeRecordsKey(), []);
};

export const getCategories = (type: RecordType) => {
  const custom = readCustomCategories();
  return Array.from(
    new Set([...(DEFAULT_CATEGORIES[type] ?? []), ...(custom[type] ?? [])]),
  ).sort();
};

export const addCategory = (type: RecordType, name: string) => {
  const custom = readCustomCategories();
  custom[type] = Array.from(new Set([...(custom[type] ?? []), name]));
  write(activeCategoriesKey(), custom);
};
