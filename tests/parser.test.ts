import { parseLogFile } from "../src/parser";

describe("parseLogFile", () => {
  it("parses valid log lines", () => {
    const input = `
      {"timestamp":"2025-10-01T10:00:00Z","level":"info","message":"Started"}
      {"timestamp":"2025-10-01T10:01:00Z","level":"error","message":"Failed"}
    `;
    const stats = parseLogFile(input);
    expect(stats.total).toBe(2);
    expect(stats.levels.info).toBe(1);
    expect(stats.levels.error).toBe(1);
  });

  it("ignores malformed lines", () => {
    const input = `
      {"timestamp":"2025-10-01T10:00:00Z","level":"info","message":"Started"}
      {malformed json}
    `;
    const stats = parseLogFile(input);
    expect(stats.total).toBe(1);
    expect(stats.levels.info).toBe(1);
  });

  it("handles empty file", () => {
    const stats = parseLogFile("");
    expect(stats.total).toBe(0);
    expect(stats.levels).toEqual({});
  });

  it("counts multiple entries of same level", () => {
    const input = `
      {"timestamp":"T","level":"info","message":"1"}
      {"timestamp":"T","level":"info","message":"2"}
    `;
    const stats = parseLogFile(input);
    expect(stats.levels.info).toBe(2);
  });
});
