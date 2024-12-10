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
        } catch(err) {
            console.error("Error reading file:", err);
        }      
    }

    language = determineLanguage(filePath);
    updateCycle();
}

function determineLanguage(filePath: string): string {
    if (filePath.endsWith('.ts')) return 'ts';
    if (filePath.endsWith('.c')) return 'c';
    return "plaintext";
}

async function updateCycle() {
    const key = keyHandler();
    const fileContent = await Get();
    const highlight = new Highlight();
    const lines = fileContent.split('\n'); 

    setTimeout(() => {
        clear();
        handleKeyPress(key, lines);
        displayLines(lines, highlight);
        updateCycle();
    }, 10);
}

function handleKeyPress(key: string, lines: string[]) {
    if (key === 'weight') return;

    switch (key) {
        case '\u001B[A': // up
            if (line < lines.length) line++;
            break;
        case '\u001B[B': // down
            if (line > 1) line--;
            break;
        case '\u001B[D': // left
            if (index > 1) index--;
            break;
        case '\u001B[C': // right
            const len = lines[line - 1].length;
            if (index < len) index++;
            break;
        case '\u0008': // backspace
            index--;
            break;
    }
}

function displayLines(lines: string[], highlight: Highlight) {
    for (let i = 0; i < lines.length; i++) {
        const formattedLine = (language === "ts" || language === "c") 
            ? highlight.HighlightCode(lines[i], language) 
            : lines[i];
        console.log(`${i + 1}. ${formattedLine}`);
    }
}

export function getLanguage(): string {
    return language;
}