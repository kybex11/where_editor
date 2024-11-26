import { Highlight } from "./highlight.js";
import { Get, Write } from "./storage.js";
import * as fs from 'fs';
import { clear } from "./tools.js";
import { keyHandler } from "./controllers/keyHandler.js";

export async function printCodeWithLines(filePath: string) {
    let language = '';

    const highlight = new Highlight();
    const fileContent = await Get();

    clear();
    
    if (filePath) {
        const data = fs.readFileSync(filePath, 'utf-8');
        await Write(data);
    }

    const lines = fileContent.split('\n');

    if (filePath.endsWith('.ts')) {
        language = 'ts';
    } else if (filePath.endsWith('.c')) {
        language = 'c';
    }

    for (let i = 0; i < lines.length; i++) {

        if (language == "ts" || language == "c") {
            const hig1 = highlight.HighlightCode(lines[i], 'ts');
            console.log(`${i + 1}.  ${hig1}`);
        } else {
            console.log(`${i + 1}. ${lines[i]}`);
        }
        
    }

    keyHandler();
    
}