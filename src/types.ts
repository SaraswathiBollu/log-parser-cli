export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export interface LogStats {
  total: number;
  levels: Record<string, number>;
}
