import { exec } from "child_process";

export function writeCommand(command: string) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return error.message;
        }
        if (stderr) {
            return stderr;
        }
        return stdout;
    })
}