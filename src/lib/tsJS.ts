import * as vscode from "vscode";
import { Wololo } from "../constants";
import { rename } from "../util/rename";

export const toJS = vscode.commands.registerCommand(Wololo.toJS, async () => {
  const files = await vscode.workspace.findFiles(`{!**/node_modules/**,**/*}.{ts,tsx}`);

  /** May contain `d.ts` files! */
  const unfilteredPaths = files.map(({ fsPath: path }) => path);

  const paths = unfilteredPaths.filter((path) => !path.endsWith(`.d.ts`));

  const { length } = await Promise.all(
    paths.map((path) => {
      const pathParts = path.split(`.`).filter(Boolean);

      const fileExtension = pathParts.pop();

      switch (fileExtension) {
        case `ts`:
          pathParts.push(`js`);
          break;
        case `tsx`:
          pathParts.push(`jsx`);
          break;
        default:
          vscode.window.showErrorMessage("UH-OH!");
      }

      const newPath = pathParts.join(".");

      return rename(path, newPath);
    }),
  );

  vscode.window.showInformationMessage(`${Wololo.toJS} executed (${length} results)`);
});
