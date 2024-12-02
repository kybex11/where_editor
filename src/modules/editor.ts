import { printCodeWithLines } from "./lines.js";
import { Write } from "./storage.js";
import { bottomText, centeredText } from "./tools.js";
import * as fs from 'fs';

export function runEditorWithoutFile() {
    centeredText("No files opened currently...", true);
    bottomText("ESC - Close  F - File Browser", false);
}

export async function runEditorWithFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    await Write(content);

    printCodeWithLines(filePath);
}