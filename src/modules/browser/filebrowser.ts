import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as readline from 'readline';
import { runEditorWithFile } from '../editor.js';
import { updateFileBrowserDirectory } from '../commands/commands.js';

export function GetFilesAndDirectories(dir: string) {
    try {
        const items = fs.readdirSync(dir);
        const result: string[] = [];

        for (const item of items) {
            const fullPath = path.join(dir, item);
            result.push(fullPath);
        }

        return result;
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        return [];
    }
}

export function FileBrowser(homeDir: string, filePath: string) {
    let currentLocation = homeDir
    let filesAndDirectories = GetFilesAndDirectories(currentLocation);
    let rows: number;
    let output: string[][];
    updateFileBrowserDirectory(homeDir);
    
    const updateCurrentDirectory = (newPath: string) => {
        updateFileBrowserDirectory(newPath);
        currentLocation = newPath;
        filesAndDirectories = GetFilesAndDirectories(currentLocation);
        
        const columns = 3;
        rows = Math.ceil(filesAndDirectories.length / columns);
        output = Array.from({ length: rows }, () => Array(columns).fill(''));

        for (let i = 0; i < filesAndDirectories.length; i++) {
            const columnIndex = i % columns;
            const rowIndex = Math.floor(i / columns);
            output[rowIndex][columnIndex] = filesAndDirectories[i];
        }
        
        selectedIndex = 0;
        selectedRow = 0;
        selectedColumn = 0;
        render();
    };

    const columns = 3;
    const terminalWidth = process.stdout.columns || 80;
    const columnWidth = Math.floor(terminalWidth / columns);
    rows = Math.ceil(filesAndDirectories.length / columns);
    output = Array.from({ length: rows }, () => Array(columns).fill(''));

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
        console.log(`Contents of ${currentLocation}: \n`);

        output.forEach((row) => {
            console.log(row.map((fullPath, index) => {
                if (!fullPath) return ''.padEnd(columnWidth);
                
                const isDirectory = fs.statSync(fullPath).isDirectory();
                const emoji = isDirectory ? '📁' : '📄';
                const basename = path.basename(fullPath);
                const displayText = `${emoji} ${basename}`;

                if (selectedRow === output.indexOf(row) && selectedColumn === index) {
                    return `\x1b[44m${displayText.padEnd(columnWidth)}\x1b[0m`;
                }
                return displayText.padEnd(columnWidth);
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
                if (selectedRow < rows - 1 && 
                    (selectedRow * columns + selectedColumn) < filesAndDirectories.length) {
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
                const selectedPath = filesAndDirectories[selectedItemIndex];
                const stat = fs.statSync(selectedPath);

                if (stat.isDirectory()) { 
                    updateCurrentDirectory(selectedPath);
                } else if (stat.isFile()) {
                    runEditorWithFile(selectedPath);
                }
                break;
            case '\u001b':
                const parentDir = path.dirname(currentLocation);
                if (parentDir !== currentLocation) {
                    updateCurrentDirectory(parentDir);
                }
                break;
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