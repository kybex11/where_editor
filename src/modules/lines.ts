import { Highlight } from "./highlight.js";
import { Get, Write } from "./storage.js";
import * as fs from 'fs';
import { clear } from "./tools.js";
import { keyHandler } from "./handler/handler.js";

let language: string = '';
let line: number = 1;
let index: number = 1;

export async function printCodeWithLines(filePath: string) {
    clear();
    
    if (filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            await Write(data);
        } catch(err) {}      
    }

    if (filePath.endsWith('.ts')) {
        language = 'ts';
    } else if (filePath.endsWith('.c')) {
        language = 'c';
    } else {
        language = "plaintext";
    }
    
    updateCycle();
}

async function updateCycle() {
        const key = keyHandler();
        const fileContent = await Get();
        const highlight = new Highlight();
        const lines = fileContent.split('\n'); 

        setTimeout(() => {
            clear();

            if (key !== 'weight') {
               if (key == '\u001B[A') {
                const val = line + 1 ;
                if (val !> lines.length) {
                    line++;
                }
                //up
               } else if (key == '\u001B[B') {
                const val = line - 1;
                if (val < 1) {
                    line = 1;
                } else {
                    line--;
                }

                //down
               } else if (key == '\u001B[D') {
                
                const newIndex = index - 1;

                if (newIndex <= 1) {
                    index = 1;
                } else {
                    index--;
                }
                //left
               } else if (key == '\u001B[C') {
                const len = lines[line - 1].length;
                const newIndex = index + 1;
                if (newIndex >= len) {
                    index = len;
                } else {
                   index++; 
                }
                
                //right
               } else if (key == '\u0008') {
                //backspace
                index--;
               }
            }
            
            for (let i = 0; i < lines.length; i++) {
                if (language == "ts" || language == "c") {
                    const hig1 = highlight.HighlightCode(lines[i], language);
                    console.log(`${i + 1}.  ${hig1}`);
                } else if (language == "plaintext") {
                    console.log(`${i + 1}. ${lines[i]}`);
                }
            }
            updateCycle();
        }, 10);
}

export function getLanguage(): string {
    return language;
}