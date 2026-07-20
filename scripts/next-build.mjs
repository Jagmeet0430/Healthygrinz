import { removeBuildFolder, runNext } from "./next-utils.mjs";

removeBuildFolder(".next");
runNext(["build"], ".next");
