import { useMemo, useState } from "react";
import { DEFAULT_CATEGORIES } from "../constants";
import { getCategoryUsage } from "../lib/calculations";
import {
  addCategory,
  getCategories,
  removeCategory,
  renameCategory,
} from "../storage/finance-storage";
import type { FinanceRecord, RecordType } from "../types";

type CategoryFeedback = {
  type: "success" | "error";
  message: string;
};

export const useCategoryManager = (records: FinanceRecord[]) => {
  const [type, setTypeState] = useState<RecordType>("income");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState<CategoryFeedback | null>(null);
  const [categories, setCategories] = useState(() => getCategories("income"));
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const usage = useMemo(() => getCategoryUsage(records, type), [records, type]);
  const trimmedName = name.trim();
  const trimmedEditName = editName.trim();

  const setType = (nextType: RecordType) => {
    setTypeState(nextType);
    setCategories(getCategories(nextType));
    setName("");
    setEditingCategory(null);
    setEditName("");
    setFeedback(null);
  };

  const handleAdd = () => {
    if (!trimmedName) return;
    if (
      categories.some(
        (category) => category.toLowerCase() === trimmedName.toLowerCase(),
      )
    ) {
      setFeedback({
        type: "error",
        message: `${trimmedName} already exists as a ${type} category.`,
      });
      return;
    }

    const added = addCategory(type, trimmedName);

    if (!added) {
      setFeedback({
        type: "error",
        message: `${trimmedName} could not be saved. Check browser storage and try again.`,
      });
      return;
    }

    setCategories(getCategories(type));
    setFeedback({
      type: "success",
      message: `${trimmedName} was added to ${type} categories.`,
    });
    setName("");
  };

  const isDefaultCategory = (category: string) =>
    DEFAULT_CATEGORIES[type].some(
      (item) => item.toLowerCase() === category.toLowerCase(),
    );

  const beginEdit = (category: string) => {
    if (isDefaultCategory(category)) {
      setFeedback({
        type: "error",
        message: "Default categories cannot be edited.",
      });
      return;
    }

    setEditingCategory(category);
    setEditName(category);
    setFeedback(null);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditName("");
  };

  const canSaveEdit = (category: string) => {
    if (!trimmedEditName) return false;
    if (trimmedEditName.toLowerCase() === category.toLowerCase()) return false;
    return !categories.some(
      (item) =>
        item.toLowerCase() === trimmedEditName.toLowerCase() &&
        item.toLowerCase() !== category.toLowerCase(),
    );
  };

  const handleRename = (category: string) => {
    if (!trimmedEditName) return;
    if (isDefaultCategory(category)) {
      setFeedback({
        type: "error",
        message: "Default categories cannot be edited.",
      });
      return;
    }
    if (!canSaveEdit(category)) {
      setFeedback({
        type: "error",
        message: `${trimmedEditName} already exists as a ${type} category.`,
      });
      return;
    }

    const renamed = renameCategory(type, category, trimmedEditName);
    if (!renamed) {
      setFeedback({
        type: "error",
        message: `${category} could not be renamed.`,
      });
      return;
    }

    setCategories(getCategories(type));
    setEditingCategory(null);
    setEditName("");
    setFeedback({
      type: "success",
      message: `${category} was renamed to ${trimmedEditName}.`,
    });
  };

  const handleRemove = (category: string) => {
    if (isDefaultCategory(category)) {
      setFeedback({
        type: "error",
        message: "Default categories cannot be removed.",
      });
      return;
    }
    const itemUsage = usage.get(category);
    if (itemUsage?.count) {
      setFeedback({
        type: "error",
        message: `${category} is used by ${itemUsage.count} records. Rename it or edit those records before removing it.`,
      });
      return;
    }

    const removed = removeCategory(type, category);
    if (!removed) {
      setFeedback({
        type: "error",
        message: `${category} could not be removed.`,
      });
      return;
    }

    setCategories(getCategories(type));
    setEditingCategory(null);
    setEditName("");
    setFeedback({
      type: "success",
      message: `${category} was removed from ${type} categories.`,
    });
  };

  return {
    type,
    name,
    editName,
    categories,
    usage,
    feedback,
    editingCategory,
    hasRecordsForType: usage.size > 0,
    canAddCategory: trimmedName.length > 0,
    isDefaultCategory,
    canSaveEdit,
    setType,
    setName,
    setEditName,
    handleAdd,
    beginEdit,
    cancelEdit,
    handleRename,
    handleRemove,
  };
};
