import { Translate } from "./languages/translate.js";
import { printCodeWithLines } from "./lines.js";
import { Write } from "./storage.js";
import { bottomText, centeredText } from "./tools.js";
import * as fs from 'fs';

export async function runEditorWithoutFile() {
    const translate = new Translate();

    const nfocTranslation = await translate.getTranslate('nfoc');
    centeredText(nfocTranslation, true);

    const ecffbTranslation = await translate.getTranslate('ecffb');
    bottomText(ecffbTranslation, false);
}

export async function runEditorWithFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    await Write(content);

    printCodeWithLines(filePath);
}