export type RecordType = "income" | "expense";

export type RecordMode = "tracked" | "planned";

export type ModeFilter = "both" | RecordMode;

export interface FinanceRecord {
  id: string;
  type: RecordType;
  mode: RecordMode;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
  description?: string;
  createdAt: string;
}

export type FinanceRecordInput = Omit<FinanceRecord, "id" | "createdAt">;
