import { TEST_USER } from "./test-user";
import type {
  FinanceRecord,
  RecordType,
  RecordMode,
} from "../../finance/types";
import {
  getRecordsForUser,
  replaceRecordsForUser,
} from "../../finance/storage/finance-storage";

const makeSeedRecord = (
  type: RecordType,
  mode: RecordMode,
  category: string,
  amount: number,
  day: number,
  monthOffset: number,
  description?: string,
): FinanceRecord => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, day);
  return {
    id: crypto.randomUUID(),
    type,
    mode,
    category,
    amount,
    date: date.toISOString().slice(0, 10),
    description,
    createdAt: new Date().toISOString(),
  };
};

export const seedTestUserRecords = () => {
  const existingRecords = getRecordsForUser(TEST_USER.id);
  if (existingRecords.length > 0) return;
  const records: FinanceRecord[] = [];
  for (let monthOffset = -5; monthOffset <= 0; monthOffset += 1) {
    records.push(
      makeSeedRecord("income", "planned", "Salary", 4200, 1, monthOffset),
    );
    records.push(
      makeSeedRecord("income", "tracked", "Salary", 4200, 1, monthOffset),
    );
    records.push(
      makeSeedRecord("income", "planned", "Freelance", 600, 15, monthOffset),
    );
    records.push(
      makeSeedRecord(
        "income",
        "tracked",
        "Freelance",
        monthOffset === 0 ? 320 : 800,
        18,
        monthOffset,
      ),
    );
    records.push(
      makeSeedRecord("expense", "planned", "Housing", 1400, 2, monthOffset),
    );
    records.push(
      makeSeedRecord("expense", "tracked", "Housing", 1400, 2, monthOffset),
    );
    records.push(
      makeSeedRecord("expense", "planned", "Groceries", 450, 6, monthOffset),
    );
    records.push(
      makeSeedRecord(
        "expense",
        "tracked",
        "Groceries",
        480 + monthOffset * 20,
        8,
        monthOffset,
      ),
    );
    records.push(
      makeSeedRecord("expense", "planned", "Dining", 200, 10, monthOffset),
    );
    records.push(
      makeSeedRecord(
        "expense",
        "tracked",
        "Dining",
        280 - monthOffset * 15,
        12,
        monthOffset,
      ),
    );
    records.push(
      makeSeedRecord("expense", "planned", "Transport", 120, 4, monthOffset),
    );
    records.push(
      makeSeedRecord("expense", "tracked", "Transport", 95, 4, monthOffset),
    );
    records.push(
      makeSeedRecord("expense", "planned", "Subscriptions", 60, 3, monthOffset),
    );
    records.push(
      makeSeedRecord("expense", "tracked", "Subscriptions", 72, 3, monthOffset),
    );
  }
  replaceRecordsForUser(TEST_USER.id, records);
};
