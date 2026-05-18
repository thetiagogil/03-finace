import { useSyncExternalStore } from "react";
import {
  getCurrentUser,
  getEmptySessionSnapshot,
  getSessionSnapshot,
  subscribeToAuthStorage,
} from "../storage/auth-storage";

export const useAuth = () => {
  const session = useSyncExternalStore(
    subscribeToAuthStorage,
    getSessionSnapshot,
    getEmptySessionSnapshot,
  );
  void session;
  const user = getCurrentUser();
  return { user, isAuthenticated: Boolean(user) };
};
