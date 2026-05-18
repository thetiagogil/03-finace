import { useSyncExternalStore } from "react";
import {
  getEmptyRecordsSnapshot,
  getRecordsSnapshot,
  subscribeToFinanceStorage,
} from "../storage/finance-storage";

export const useRecords = () => {
  return useSyncExternalStore(
    subscribeToFinanceStorage,
    getRecordsSnapshot,
    getEmptyRecordsSnapshot,
  );
};
