import { printCodeWithLines } from "./lines.js";
import { centeredText } from "./tools.js";

export function runEditorWithoutFile() {
    centeredText("No files opened currently...");
}

export function runEditorWithFile() {
    printCodeWithLines();
}