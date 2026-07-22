import net from "node:net";
import { execFileSync } from "node:child_process";
import { removeBuildFolder, runNext } from "./next-utils.mjs";

const lan = process.argv.includes("--lan");
const portArgIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
const port = portArgIndex >= 0 ? Number(process.argv[portArgIndex + 1]) : 3000;
const args = ["dev"];

if (lan) args.push("-H", "0.0.0.0");
args.push("-p", String(port));

function isPortInNetstat(portToCheck) {
  if (process.platform !== "win32") return false;

  try {
    const output = execFileSync("netstat", ["-ano"], { encoding: "utf8" });
    return output
      .split(/\r?\n/)
      .some((line) => line.includes("LISTENING") && new RegExp(`[:.]${portToCheck}\\s`).test(line));
  } catch {
    return false;
  }
}

function canBind(portToCheck, host) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", (error) => {
      resolve(error.code !== "EADDRINUSE");
    });

    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen({ port: portToCheck, host, exclusive: true });
  });
}

async function isPortInUse(portToCheck) {
  if (isPortInNetstat(portToCheck)) return true;

  const checks = await Promise.all([canBind(portToCheck, "::"), canBind(portToCheck, "0.0.0.0")]);
  return checks.some((available) => !available);
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("Invalid port. Use --port 3001, for example.");
  process.exit(1);
}

if (await isPortInUse(port)) {
  console.error(`Port ${port} is already in use. Stop the existing server or run: npm run dev -- --port ${port + 1}`);
  process.exit(1);
}

removeBuildFolder(".next-dev");
runNext(args, ".next-dev");
