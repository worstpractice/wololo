import { rename as callBackRename } from "fs";
import { promisify } from "util";

export const rename = promisify(callBackRename);
