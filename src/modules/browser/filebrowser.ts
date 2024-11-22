import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

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

export function FileBrowser() {
    const homeDir = os.homedir();
    const filesAndDirectories = GetFilesAndDirectories(homeDir);
    console.log(`${homeDir}\n`);

    const columns = 3;
    const terminalWidth = process.stdout.columns || 80;
    const columnWidth = Math.floor(terminalWidth / columns);

    const rows = Math.ceil(filesAndDirectories.length / columns);
    const output: string[][] = Array.from({ length: rows}, () => Array(columns).fill(''));

    for (let i = 0; i < filesAndDirectories.length; i++) {
        const columnIndex = i % columns;
        const rowIndex = Math.floor(i / columns);
        output[rowIndex][columnIndex] = filesAndDirectories[i];
    }

    output.forEach(row => {
        console.log(row.map(item => item.padEnd(columnWidth)).join(''));
    })
}

