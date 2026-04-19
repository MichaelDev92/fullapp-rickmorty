const KEY = "rm-session-id";

export function getOrCreateSessionId(): string {
  const existing = localStorage.getItem(KEY);
  if (existing && existing.length >= 8) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(KEY, id);
  return id;
}
