const KEY = "rm-session-id";

export function getOrCreateSessionId(): string {
  // Persist a stable client id to scope favorites/comments per browser session.
  const existing = localStorage.getItem(KEY);
  if (existing && existing.length >= 8) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(KEY, id);
  return id;
}
