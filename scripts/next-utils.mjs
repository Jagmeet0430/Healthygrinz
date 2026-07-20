import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

export function removeBuildFolder(folderName) {
  const root = process.cwd();
  const target = path.resolve(root, folderName);
  const normalizedRoot = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (!target.startsWith(normalizedRoot)) {
    throw new Error(`Refusing to remove path outside project: ${target}`);
  }

  fs.rmSync(target, { recursive: true, force: true });
  console.log(`Cleaned ${folderName}`);
}

export function runNext(args, distDir) {
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, ...args], {
    cwd: process.cwd(),
    env: { ...process.env, NEXT_DIST_DIR: distDir },
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}
