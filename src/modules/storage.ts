import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export async function Get(): Promise<string> {
    try {
        const filePath = path.join(os.homedir(), 'lsdneo.tmp');
        const content = fs.readFileSync(filePath, 'utf-8');
        return content;
    } catch (e) {
        console.error("Error reading tmp:", e.message);
        await appendTMP();
        return null;
    }
}

export async function Write(content: any): Promise<void> {
    try {
        const filePath = path.join(os.homedir(), 'lsdneo.tmp');
        fs.writeFileSync(filePath, content);
    } catch (e) {
        console.error("Error writing tmp:", e.message);
        await appendTMP();
    }
}

async function appendTMP() {
    const filePath = path.join(os.homedir(), 'lsdneo.tmp');
    try {
        await fs.promises.appendFile(filePath, '', 'utf-8');
    } catch (e) {}
}