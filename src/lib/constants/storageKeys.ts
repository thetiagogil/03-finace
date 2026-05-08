const recordsPrefix = "finace.records";
const categoriesPrefix = "finace.categories";

export const STORAGE_KEYS = {
  users: "finace.users.v1",
  session: "finace.session.v1",
  recordsForUser: (userId: string) => `${recordsPrefix}.${userId}.v1`,
  categoriesForUser: (userId: string) => `${categoriesPrefix}.${userId}.v1`
} as const;
