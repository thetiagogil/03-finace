export type RecordKind = "income" | "expense";

export type RecordMode = "planned" | "tracked";

export type ModeFilter = "both" | RecordMode;

export interface FinanceRecord {
  id: string;
  kind: RecordKind;
  mode: RecordMode;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
  description?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
