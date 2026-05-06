import { useSyncExternalStore } from "react";
import type { User } from "../models/finance";

const usersKey = "finace.users.v1";
const sessionKey = "finace.session.v1";

interface StoredUser extends User {
  passwordHash: string;
}

type Listener = () => void;

const listeners = new Set<Listener>();

const emit = () => listeners.forEach(listener => listener());

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
};

const hash = (value: string) => {
  let result = 5381;
  for (let index = 0; index < value.length; index += 1) {
    result = ((result << 5) + result) ^ value.charCodeAt(index);
  }
  return (result >>> 0).toString(36);
};

const getUsers = () => read<StoredUser[]>(usersKey, []);

export const getCurrentUser = (): User | null => {
  const userId = read<string | null>(sessionKey, null);
  if (!userId) return null;
  const user = getUsers().find(item => item.id === userId);
  return user ? { id: user.id, name: user.name, email: user.email } : null;
};

export const signup = (input: { name: string; email: string; password: string }) => {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!name || !email || !input.password) throw new Error("All fields are required");
  if (input.password.length < 6) throw new Error("Password must be at least 6 characters");
  const users = getUsers();
  if (users.some(user => user.email === email)) throw new Error("An account with this email already exists");
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hash(input.password)
  };
  write(usersKey, [...users, user]);
  write(sessionKey, user.id);
  return { id: user.id, name: user.name, email: user.email };
};

export const login = (input: { email: string; password: string }) => {
  const email = input.email.trim().toLowerCase();
  const user = getUsers().find(item => item.email === email);
  if (!user || user.passwordHash !== hash(input.password)) throw new Error("Invalid email or password");
  write(sessionKey, user.id);
  return { id: user.id, name: user.name, email: user.email };
};

export const logout = () => {
  localStorage.removeItem(sessionKey);
  emit();
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  const handleStorage = () => listener();
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

export const useAuth = () => {
  const session = useSyncExternalStore(subscribe, () => localStorage.getItem(sessionKey) ?? "", () => "");
  void session;
  const user = getCurrentUser();
  return { user, isAuthenticated: Boolean(user) };
};
