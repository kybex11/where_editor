import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as readline from 'readline';
import { runEditorWithFile } from '../editor.js';

export function GetFilesAndDirectories(dir: string) {
    try {
        const items = fs.readdirSync(dir);
        const result: string[] = [];

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const isDirectory = fs.statSync(fullPath).isDirectory();
            const emoji = isDirectory ? '📁' : '📄';
            result.push(`${emoji} ${item}`);
        }

        return result;
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        return [];
    }
}

export function FileBrowser(homeDir: string, filePath: string) {
    //const homeDir = os.homedir();
    const filesAndDirectories = GetFilesAndDirectories(homeDir);
    console.log(`Contents of ${homeDir}:\n`);

    const columns = 3;
    const terminalWidth = process.stdout.columns || 80;
    const columnWidth = Math.floor(terminalWidth / columns);
    const rows = Math.ceil(filesAndDirectories.length / columns);
    const output: string[][] = Array.from({ length: rows }, () => Array(columns).fill(''));

    for (let i = 0; i < filesAndDirectories.length; i++) {
        const columnIndex = i % columns;
        const rowIndex = Math.floor(i / columns);
        output[rowIndex][columnIndex] = filesAndDirectories[i];
    }

    let selectedIndex = 0;
    let selectedRow = 0;
    let selectedColumn = 0;

    const render = () => {
        readline.cursorTo(process.stdout, 0, 0);
        console.clear();
        console.log(`Contents of ${homeDir}:\n`);

        output.forEach((row) => {
            console.log(row.map((item, index) => {
                const currentIndex = row.indexOf(item) + (output.indexOf(row) * columns);
                if (selectedRow === output.indexOf(row) && selectedColumn === index) {
                    return `\x1b[44m${item.padEnd(columnWidth)}\x1b[0m`;
                }
                return item.padEnd(columnWidth);
            }).join(''));
        });
    };

    const handleInput = (data: Buffer) => {
        switch (data.toString()) {
            case '\u001B[A':
                if (selectedRow > 0) {
                    selectedRow--;
                }
                break;
            case '\u001B[B':
                if (selectedRow < rows - 1) {
                    selectedRow++;
                }
                break;
            case '\u001B[D':
                if (selectedColumn > 0) {
                    selectedColumn--;
                }
                break;
            case '\u001B[C':
                if (selectedColumn < columns - 1) {
                    selectedColumn++;
                }
                break;
            case '\r':
                const selectedItemIndex = selectedRow * columns + selectedColumn;
                console.log(`Selected: ${filesAndDirectories[selectedItemIndex]}`);
                const stat = fs.statSync(filesAndDirectories[selectedItemIndex]);

                if (stat.isDirectory()) {
                    FileBrowser(filesAndDirectories[selectedItemIndex], filePath);
                } else if (stat.isFile) {
                    runEditorWithFile(filePath);
                }
                return process.exit(0);
        }
        selectedIndex = selectedRow * columns + selectedColumn;
        render();
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', handleInput);

    render();
}

export function FileBrowserRunHome(filePath: string) {
    const homeDir = os.homedir();
    FileBrowser(homeDir, filePath);
}

