export const authUserLoginKeys = {
  todos: () => ["cookies"] as const,
  token: () => [...authUserLoginKeys.todos(), "token"] as const,
};
