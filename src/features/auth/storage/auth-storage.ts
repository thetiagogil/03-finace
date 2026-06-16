import { STORAGE_KEYS } from "../../../lib/constants/storageKeys";
import { readStorage, removeStorage, writeStorage } from "../../../lib/storage";
import { capitalizeFirstLetter } from "../../../shared/utils/text";
import type { User } from "../types";
import { TEST_USER } from "./test-user";

interface StoredUser extends User {
  passwordHash: string;
}

type Listener = () => void;

const listeners = new Set<Listener>();

const emit = () => listeners.forEach((listener) => listener());

const write = (key: string, value: unknown) => {
  const didWrite = writeStorage(key, value);

  if (didWrite) {
    emit();
  }

  return didWrite;
};

const hash = (value: string) => {
  let result = 5381;
  for (let index = 0; index < value.length; index += 1) {
    result = ((result << 5) + result) ^ value.charCodeAt(index);
  }
  return (result >>> 0).toString(36);
};

const normalizeStoredUser = (value: unknown): StoredUser | null => {
  if (!value || typeof value !== "object") return null;

  const user = value as Partial<StoredUser>;
  if (typeof user.id !== "string") return null;
  if (typeof user.name !== "string") return null;
  if (typeof user.email !== "string") return null;
  if (typeof user.passwordHash !== "string") return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    isTestUser: user.isTestUser === true ? true : undefined,
  };
};

const getUsers = () => {
  const storedUsers = readStorage<unknown>(STORAGE_KEYS.users, []);
  if (!Array.isArray(storedUsers)) return [];
  return storedUsers
    .map(normalizeStoredUser)
    .filter((user): user is StoredUser => Boolean(user));
};

const getPublicUser = (user: StoredUser): User => ({
  id: user.id,
  name: capitalizeFirstLetter(user.name),
  email: user.email,
  isTestUser: user.isTestUser,
});

const ensureTestUser = () => {
  const users = getUsers();
  const existingUser = users.find((user) => user.id === TEST_USER.id);
  if (existingUser) return existingUser;
  const user: StoredUser = {
    id: TEST_USER.id,
    name: TEST_USER.name,
    email: TEST_USER.email,
    passwordHash: hash(TEST_USER.password),
    isTestUser: TEST_USER.isTestUser,
  };
  if (!write(STORAGE_KEYS.users, [...users, user])) {
    throw new Error("Demo account could not be saved. Check browser storage.");
  }

  return user;
};

export const getCurrentUser = (): User | null => {
  const userId = readStorage<unknown>(STORAGE_KEYS.session, null);
  if (typeof userId !== "string") return null;
  if (!userId) return null;
  const user = getUsers().find((item) => item.id === userId);
  return user ? getPublicUser(user) : null;
};

export const signup = (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!name || !email || !input.password)
    throw new Error("All fields are required");
  if (input.password.length < 6)
    throw new Error("Password must be at least 6 characters");
  const users = getUsers();
  if (users.some((user) => user.email === email))
    throw new Error("An account with this email already exists");
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hash(input.password),
  };
  if (!write(STORAGE_KEYS.users, [...users, user])) {
    throw new Error("Account could not be saved. Check browser storage.");
  }

  if (!write(STORAGE_KEYS.session, user.id)) {
    throw new Error("Session could not be saved. Try logging in again.");
  }

  return getPublicUser(user);
};

export const login = (input: { email: string; password: string }) => {
  const email = input.email.trim().toLowerCase();
  const user = getUsers().find((item) => item.email === email);
  if (!user || user.passwordHash !== hash(input.password))
    throw new Error("Invalid email or password");
  if (!write(STORAGE_KEYS.session, user.id)) {
    throw new Error("Session could not be saved. Check browser storage.");
  }

  return getPublicUser(user);
};

export const continueWithTestUser = () => {
  const user = ensureTestUser();
  if (!write(STORAGE_KEYS.session, user.id)) {
    throw new Error("Demo session could not be saved. Check browser storage.");
  }

  return getPublicUser(user);
};

export const logout = () => {
  if (removeStorage(STORAGE_KEYS.session)) {
    emit();
  }
};

export const subscribeToAuthStorage = (listener: Listener) => {
  listeners.add(listener);
  const handleStorage = () => listener();
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

export const getSessionSnapshot = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.session) ?? "";
  } catch {
    return "";
  }
};

export const getEmptySessionSnapshot = () => {
  return "";
};
