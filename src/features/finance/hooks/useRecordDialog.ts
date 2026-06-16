import { useMemo, useState } from "react";
import type { FinanceRecord, RecordMode, RecordType } from "../types";
import { isRecordAmount, isRecordDate } from "../lib/validation";
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
  const [type, setTypeState] = useState<RecordType>(defaultType);
  const [mode, setMode] = useState<RecordMode>(defaultMode);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [description, setDescription] = useState("");
  const [saveError, setSaveError] = useState("");

  const categories = useMemo(() => getCategories(type), [type]);
  const numericAmount = Number(amount);
  const amountIsValid = isRecordAmount(numericAmount);
  const dateIsValid = isRecordDate(date);
  const categoryIsValid = categories.includes(category);
  const isValid = amountIsValid && dateIsValid && categoryIsValid;

  const setType = (nextType: RecordType) => {
    setTypeState(nextType);
    setCategory((currentCategory) =>
      getCategories(nextType).includes(currentCategory) ? currentCategory : "",
    );
  };

  const openDialog = () => {
    if (initialRecord) {
      setTypeState(initialRecord.type);
      setMode(initialRecord.mode);
      setCategory(initialRecord.category);
      setSubcategory(initialRecord.subcategory ?? "");
      setAmount(String(initialRecord.amount));
      setDate(initialRecord.date);
      setDescription(initialRecord.description ?? "");
    } else {
      setTypeState(defaultType);
      setMode(defaultMode);
      setCategory("");
      setSubcategory("");
      setAmount("");
      setDate(today());
      setDescription("");
    }
    setSaveError("");
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const payload = {
      type,
      mode,
      category,
      subcategory: subcategory || undefined,
      amount: numericAmount,
      date,
      description: description || undefined,
    };

    const didSave = initialRecord
      ? updateRecord(initialRecord.id, payload)
      : addRecord(payload);

    if (!didSave) {
      setSaveError(
        "Record could not be saved. Check browser storage and try again.",
      );
      return;
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
    saveError,
    isValid,
    amountIsValid,
    dateIsValid,
    categoryIsValid,
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

export type RecordDialogController = ReturnType<typeof useRecordDialog>;
