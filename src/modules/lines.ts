import { Highlight } from "./highlight.js";
import { TempManager } from "./storage.js";
import * as fs from 'fs';

export async function printCodeWithLines(filePath: string) {
    const tempManager = new TempManager();
    const highlight = new Highlight();
    const fileContent = await tempManager.Get();
    if (fileContent === null) {
        if (filePath) {
            const data = fs.readFileSync(filePath);
            tempManager.Write(data);
            printCodeWithLines(filePath);
        } else {
            console.error('Error: TMP not created');
        }
    }

    const lines = fileContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const hig1 = highlight.HighlightCode(lines[i], 'ts');
        console.log(`${i + 1}.  ${hig1}`);
    }   
}