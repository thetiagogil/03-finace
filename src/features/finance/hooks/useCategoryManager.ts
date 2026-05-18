import { useState } from "react";
import { getCategoryUsage } from "../lib/calculations";
import { addCategory, getCategories } from "../storage/finance-storage";
import type { FinanceRecord, RecordType } from "../types";

export const useCategoryManager = (records: FinanceRecord[]) => {
  const [type, setType] = useState<RecordType>("income");
  const [name, setName] = useState("");
  const categories = getCategories(type);
  const usage = getCategoryUsage(records, type);

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    addCategory(type, trimmedName);
    setName("");
  };

  return {
    type,
    name,
    categories,
    usage,
    hasRecordsForType: usage.size > 0,
    setType,
    setName,
    handleAdd,
  };
};
