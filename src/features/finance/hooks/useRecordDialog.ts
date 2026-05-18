import { useMemo, useState } from "react";
import type { FinanceRecord, RecordMode, RecordType } from "../types";
import {
  addRecord,
  getCategories,
  updateRecord,
} from "../storage/finance-storage";

interface UseRecordDialogInput {
  defaultType: RecordType;
  defaultMode: RecordMode;
  initialRecord?: FinanceRecord;
}

const today = () => new Date().toISOString().slice(0, 10);

export const useRecordDialog = ({
  defaultType,
  defaultMode,
  initialRecord,
}: UseRecordDialogInput) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<RecordType>(defaultType);
  const [mode, setMode] = useState<RecordMode>(defaultMode);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [description, setDescription] = useState("");

  const categories = useMemo(() => getCategories(type), [type]);
  const isValid = Boolean(category && amount && Number(amount) > 0 && date);

  const openDialog = () => {
    if (initialRecord) {
      setType(initialRecord.type);
      setMode(initialRecord.mode);
      setCategory(initialRecord.category);
      setSubcategory(initialRecord.subcategory ?? "");
      setAmount(String(initialRecord.amount));
      setDate(initialRecord.date);
      setDescription(initialRecord.description ?? "");
    } else {
      setType(defaultType);
      setMode(defaultMode);
      setCategory("");
      setSubcategory("");
      setAmount("");
      setDate(today());
      setDescription("");
    }
    setOpen(true);
  };

  const handleSubmit = () => {
    const payload = {
      type,
      mode,
      category,
      subcategory: subcategory || undefined,
      amount: Number(amount),
      date,
      description: description || undefined,
    };

    if (initialRecord) {
      updateRecord(initialRecord.id, payload);
    } else {
      addRecord(payload);
    }

    setOpen(false);
  };

  return {
    open,
    type,
    mode,
    category,
    subcategory,
    amount,
    date,
    description,
    categories,
    isValid,
    setOpen,
    setType,
    setMode,
    setCategory,
    setSubcategory,
    setAmount,
    setDate,
    setDescription,
    openDialog,
    handleSubmit,
  };
};
