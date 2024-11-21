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
    console.log(filesAndDirectories.join('\n')); // format without '' and []
}

