import { deepStrictEqual } from "assert";
import * as vscode from "vscode";
// import * as Wololo from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    deepStrictEqual(-1, [1, 2, 3].indexOf(5));
    deepStrictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
