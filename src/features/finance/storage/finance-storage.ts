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
  const didWrite = writeStorage(key, value);

  if (didWrite) {
    emit();
  }

  return didWrite;
};

const categoryEquals = (left: string, right: string) =>
  left.trim().toLowerCase() === right.trim().toLowerCase();

const readRecords = (key: string) => {
  const storedRecords = readStorage<unknown>(key, []);
  if (!Array.isArray(storedRecords)) return [];

  return storedRecords
    .map(normalizeRecord)
    .filter((record): record is FinanceRecord => Boolean(record));
};

const normalizeCategories = (value: unknown) =>
  Array.isArray(value)
    ? value
        .filter((category): category is string => typeof category === "string")
        .map((category) => category.trim())
        .filter(Boolean)
    : [];

const readCustomCategories = () => {
  const storedCategories = readStorage<unknown>(activeCategoriesKey(), {});
  if (!storedCategories || typeof storedCategories !== "object") return {};

  const categories = storedCategories as Partial<Record<RecordType, unknown>>;
  return {
    income: normalizeCategories(categories.income),
    expense: normalizeCategories(categories.expense),
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
  let json: string;

  try {
    json = localStorage.getItem(key) ?? "[]";
  } catch {
    return emptyRecords;
  }

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
  return write(STORAGE_KEYS.recordsForUser(userId), records);
};

export const getRecords = () => readRecords(activeRecordsKey());

export const addRecord = (record: FinanceRecordInput) => {
  const nextRecord: FinanceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  return write(activeRecordsKey(), [nextRecord, ...getRecords()]);
};

export const updateRecord = (id: string, patch: Partial<FinanceRecord>) => {
  return write(
    activeRecordsKey(),
    getRecords().map((record) =>
      record.id === id ? { ...record, ...patch } : record,
    ),
  );
};

export const deleteRecord = (id: string) => {
  return write(
    activeRecordsKey(),
    getRecords().filter((record) => record.id !== id),
  );
};

export const clearAllRecords = () => {
  return write(activeRecordsKey(), []);
};

export const getCategories = (type: RecordType) => {
  const custom = readCustomCategories();
  return Array.from(
    new Set([...(DEFAULT_CATEGORIES[type] ?? []), ...(custom[type] ?? [])]),
  ).sort();
};

export const addCategory = (type: RecordType, name: string) => {
  const trimmedName = name.trim();
  if (!trimmedName) return false;
  if (getCategories(type).some((category) => categoryEquals(category, name))) {
    return false;
  }

  const custom = readCustomCategories();
  custom[type] = [...(custom[type] ?? []), trimmedName];
  return write(activeCategoriesKey(), custom);
};

export const renameCategory = (
  type: RecordType,
  currentName: string,
  nextName: string,
) => {
  const trimmedNextName = nextName.trim();
  if (!trimmedNextName) return false;

  const custom = readCustomCategories();
  if (
    DEFAULT_CATEGORIES[type].some((category) =>
      categoryEquals(category, currentName),
    )
  ) {
    return false;
  }

  const customCategories = custom[type] ?? [];
  if (
    !customCategories.some((category) => categoryEquals(category, currentName))
  ) {
    return false;
  }

  if (
    getCategories(type).some(
      (category) =>
        categoryEquals(category, trimmedNextName) &&
        !categoryEquals(category, currentName),
    )
  ) {
    return false;
  }

  custom[type] = customCategories.map((category) =>
    categoryEquals(category, currentName) ? trimmedNextName : category,
  );

  const records = getRecords().map((record) =>
    record.type === type && categoryEquals(record.category, currentName)
      ? { ...record, category: trimmedNextName }
      : record,
  );

  const categoriesKey = activeCategoriesKey();
  const recordsKey = activeRecordsKey();
  const previousCategories = readStorage<unknown>(categoriesKey, {});

  if (!writeStorage(categoriesKey, custom)) {
    return false;
  }

  if (!writeStorage(recordsKey, records)) {
    writeStorage(categoriesKey, previousCategories);
    return false;
  }

  emit();
  return true;
};

export const removeCategory = (type: RecordType, name: string) => {
  const custom = readCustomCategories();
  if (
    DEFAULT_CATEGORIES[type].some((category) => categoryEquals(category, name))
  ) {
    return false;
  }

  const customCategories = custom[type] ?? [];
  if (!customCategories.some((category) => categoryEquals(category, name))) {
    return false;
  }

  custom[type] = customCategories.filter(
    (category) => !categoryEquals(category, name),
  );
  return write(activeCategoriesKey(), custom);
};
