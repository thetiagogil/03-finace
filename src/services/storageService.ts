export const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
