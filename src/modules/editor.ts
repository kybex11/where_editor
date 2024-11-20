import { printCodeWithLines } from "./lines.js";
import { bottomText, centeredText } from "./tools.js";

export function runEditorWithoutFile() {
    centeredText("No files opened currently...", true);
    bottomText("ESC - Close", false);
}

export function runEditorWithFile() {
    printCodeWithLines();
}