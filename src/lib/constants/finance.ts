import type { RecordType } from "../../types/financeRecord";

export const DEFAULT_CATEGORIES: Record<RecordType, string[]> = {
  income: ["Salary", "Freelance", "Investments", "Side Project", "Other"],
  expense: ["Housing", "Groceries", "Transport", "Dining", "Utilities", "Subscriptions", "Health", "Entertainment", "Travel", "Shopping", "Other"]
};
