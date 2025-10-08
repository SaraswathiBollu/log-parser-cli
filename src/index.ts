import fs from "fs";
import { parseLogFile } from "./parser.js";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: npm start -- <logfile>");
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const stats = parseLogFile(fileContent);
  console.log(JSON.stringify(stats, null, 2));
} catch (err) {
  console.error(`Error: ${(err as Error).message}`);
  process.exit(1);
}
