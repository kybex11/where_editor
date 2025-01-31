import * as fs from 'fs';
import os from 'os';

class LogFile {
    async write(_content: string) {
        const content = await this.read();
        fs.writeFileSync(`${os.homedir()}/editor_latest.log`, `${content}${_content}`);
    }

    async read(): Promise<string> {
        try {
            const data = await fs.readFileSync(`${os.homedir()}/editor_latest.log`);
            return data.toString();
        } catch (error) {
            return '';
        }
    }
}

export class Logs {
    private logFile: LogFile;

    constructor() {
        this.logFile = new LogFile();
    }

    async writeLogs(_prefix: number, _content: string,) {
        let prefix: string;
        
        if (_prefix == 1) {
            prefix = '[LOG]';
        } else if (_prefix == 2) {
            prefix = '[Error]';
        } else if (_prefix == 3) {
            prefix = '[Warning]';
        } else { return; }

        const log = `${prefix} ${_content}`;
        await this.logFile.write(log);
    }

    async writePluginLogs(_prefix: string, _content: string,) {
        const log = `${_prefix} ${_content}`;
        await this.logFile.write(log);
    }
}
