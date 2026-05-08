import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "../lib/constants/storageKeys";
import { TEST_USER } from "../lib/constants/testUser";
import { capitalizeFirstLetter } from "../lib/utils/text";
import type { User } from "../types/user";
import { readStorage, removeStorage, writeStorage } from "./storageService";

interface StoredUser extends User {
  passwordHash: string;
}

type Listener = () => void;

const listeners = new Set<Listener>();

const emit = () => listeners.forEach(listener => listener());

const write = (key: string, value: unknown) => {
  writeStorage(key, value);
  emit();
};

const hash = (value: string) => {
  let result = 5381;
  for (let index = 0; index < value.length; index += 1) {
    result = ((result << 5) + result) ^ value.charCodeAt(index);
  }
  return (result >>> 0).toString(36);
};

const getUsers = () => readStorage<StoredUser[]>(STORAGE_KEYS.users, []);

const getPublicUser = (user: StoredUser): User => ({
  id: user.id,
  name: capitalizeFirstLetter(user.name),
  email: user.email,
  isTestUser: user.isTestUser
});

const ensureTestUser = () => {
  const users = getUsers();
  const existingUser = users.find(user => user.id === TEST_USER.id);
  if (existingUser) return existingUser;
  const user: StoredUser = {
    id: TEST_USER.id,
    name: TEST_USER.name,
    email: TEST_USER.email,
    passwordHash: hash(TEST_USER.password),
    isTestUser: TEST_USER.isTestUser
  };
  write(STORAGE_KEYS.users, [...users, user]);
  return user;
};

export const getCurrentUser = (): User | null => {
  const userId = readStorage<string | null>(STORAGE_KEYS.session, null);
  if (!userId) return null;
  const user = getUsers().find(item => item.id === userId);
  return user ? getPublicUser(user) : null;
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
  write(STORAGE_KEYS.users, [...users, user]);
  write(STORAGE_KEYS.session, user.id);
  return getPublicUser(user);
};

export const login = (input: { email: string; password: string }) => {
  const email = input.email.trim().toLowerCase();
  const user = getUsers().find(item => item.email === email);
  if (!user || user.passwordHash !== hash(input.password)) throw new Error("Invalid email or password");
  write(STORAGE_KEYS.session, user.id);
  return getPublicUser(user);
};

export const continueWithTestUser = () => {
  const user = ensureTestUser();
  write(STORAGE_KEYS.session, user.id);
  return getPublicUser(user);
};

export const logout = () => {
  removeStorage(STORAGE_KEYS.session);
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
  const session = useSyncExternalStore(subscribe, () => localStorage.getItem(STORAGE_KEYS.session) ?? "", () => "");
  void session;
  const user = getCurrentUser();
  return { user, isAuthenticated: Boolean(user) };
};
