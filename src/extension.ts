import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { toTS } from "./lib/toTS";
import { toJS } from "./lib/tsJS";

/** This method is called when your extension is activated.
 * Your extension is activated the very first time the command is executed. */
export const activate = async (context: ExtensionContext) => {
  context.subscriptions.push(toJS, toTS);

  const files = await vscode.workspace.findFiles(`{!**/node_modules/**,**/*}.{js,jsx,ts,tsx}`);

  /** May contain `d.ts` files! */
  const unfilteredPaths = files.map(({ fsPath: path }) => path);

  const paths = unfilteredPaths.filter((path) => !path.endsWith(`.d.ts`));

  const { length: jsFiles } = paths.filter((path) => path.endsWith(".js") || path.endsWith(".jsx"));

  const { length: tsFiles } = paths.filter((path) => path.endsWith(".ts") || path.endsWith(".tsx"));

  vscode.window.showInformationMessage(`Found ${jsFiles} JavaScript files and ${tsFiles} TypeScript files.`);
};

/** This method is called when your extension is deactivated. */
export const deactivate = async () => {};
