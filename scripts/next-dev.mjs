import { removeBuildFolder, runNext } from "./next-utils.mjs";

const lan = process.argv.includes("--lan");
const args = ["dev"];

if (lan) args.push("-H", "0.0.0.0");
args.push("-p", "3000");

removeBuildFolder(".next-dev");
runNext(args, ".next-dev");
