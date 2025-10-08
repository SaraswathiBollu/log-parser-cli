import { LogEntry, LogStats } from "./types";

export function parseLogFile(content: string): LogStats {
  const lines = content.trim().split("\n");
  const levels: Record<string, number> = {};

  for (const line of lines) {
    try {
      const entry: LogEntry = JSON.parse(line);
      if (!entry.level) throw new Error("Missing level");
      levels[entry.level] = (levels[entry.level] || 0) + 1;
    } catch {
      // Ignore malformed lines
      continue;
    }
  }

  const total = Object.values(levels).reduce((a, b) => a + b, 0);

  return { total, levels };
}
