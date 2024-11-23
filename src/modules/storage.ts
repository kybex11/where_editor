import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export class TempManager {
    async Get(): Promise<string> {
        try {
            const filePath = path.join(os.homedir(), 'lsdneo.tmp');
            return fs.readFileSync(filePath, 'utf-8');
        } catch (e) {
            await appendTMP();
            return null;
        }
    }
    
    async Write(content: any): Promise<void> {
        try {
            const filePath = path.join(os.homedir(), 'lsdneo.tmp');
            fs.writeFileSync(filePath, content);
        } catch (e) {
            await appendTMP();
            console.error(e);
        }
    }
}

async function appendTMP() {
    const filePath = path.join(os.homedir(), 'lsdneo.tmp');
    try {
        await fs.promises.appendFile(filePath, '', 'utf-8');
    } catch (e) {}
}