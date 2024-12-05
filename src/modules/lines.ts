import { Highlight } from "./highlight.js";
import { Get, Write } from "./storage.js";
import * as fs from 'fs';
import { clear } from "./tools.js";
import { keyHandler } from "./handler/handler.js";

let language: string = '';

export async function printCodeWithLines(filePath: string) {
    const highlight = new Highlight();
    const fileContent = await Get();

    let line = 1;
    let index = 1;

    clear();
    
    if (filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            await Write(data);
        } catch(err) {}      
    }

    const lines = fileContent.split('\n'); 

    if (filePath.endsWith('.ts')) {
        language = 'ts';
    } else if (filePath.endsWith('.c')) {
        language = 'c';
    } else {
        language = "plaintext";
    }

    for (let i = 0; i < lines.length; i++) {

        if (language == "ts" || language == "c") {
            const hig1 = highlight.HighlightCode(lines[i], language);
            console.log(`${i + 1}.  ${hig1}`);
        } else if (language == "plaintext") {
            console.log(`${i + 1}. ${lines[i]}`);
        }
        
    }

    function updateCycle() {
        const key = keyHandler();

        setTimeout(() => {
            if (key !== 'weight') {
               if (key == '\u001B[A') {
                line++;
                //up
               } else if (key == '\u001B[B') {
                line--;
                //down
               } else if (key == '\u001B[D') {
                index--;
                //left
               } else if (key == '\u001B[C') {
                index++;
                //left
               }
            }
            updateCycle();
        }, 10);
    }
    updateCycle();  
}

export function getLanguage(): string {
    return language;
}