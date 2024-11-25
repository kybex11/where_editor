import { Highlight } from "./highlight.js";
import { Get, Write } from "./storage.js";
import * as fs from 'fs';

export async function printCodeWithLines(filePath: string) {
    const highlight = new Highlight();
    const fileContent = await Get();
    if (filePath) {
        const data = fs.readFileSync(filePath, 'utf-8');
        Write(data);
        printCodeWithLines(filePath);
    }

    const lines = fileContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const hig1 = highlight.HighlightCode(lines[i], 'ts');
        console.log(`${i + 1}.  ${hig1}`);
    }   
}