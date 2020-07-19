import * as vscode from "vscode";
import { Wololo } from "../constants";
import { rename } from "../util/rename";

export const toTS = vscode.commands.registerCommand(Wololo.toTS, async () => {
  const files = await vscode.workspace.findFiles(`{!**/node_modules/**,**/*}.{js,jsx}`);

  const paths = files.map(({ fsPath: path }) => path);

  const { length } = await Promise.all(
    paths.map((path) => {
      const pathParts = path.split(`.`).filter(Boolean);

      const fileExtension = pathParts.pop();

      switch (fileExtension) {
        case `js`:
          pathParts.push(`ts`);
          break;
        case `jsx`:
          pathParts.push(`tsx`);
          break;
        default:
          vscode.window.showErrorMessage("UH-OH!");
      }

      const newPath = pathParts.join(".");

      return rename(path, newPath);
    }),
  );

  vscode.window.showInformationMessage(`${Wololo.toTS} executed (${length} results)`);
});
