import { getArgs } from "../configs/configs.js";
import { getLanguage } from "../lines.js";

export function checkCommand(command: string): boolean {
    if (command.startsWith('!')) {
        const args = command.slice(1).trim();
        if (args.length > 0) {
            // run command from terminal
            return true;
        }
    }

    switch(command) {
        case 'r':
            // run current file
            const launchArgs = getArgs(getLanguage());
            return true;
        case 'f':
            // new file in currently opened directory in file browser
            return true;
        case 'd':
            // new directory in currently opened directory in file browser
            return true;
        case 'h':
            // toggle code highlight
            return true;
        case 'rd':
            // run current workspace
            return true;
        case 'el':
            // remove currently opened directory
            return true;
        case 'ee':
            // remove currently opened file
            return true;
        default:
            return false;
    }
}

//! - run a terminal command
//r - run current file
//rd - run current workspace
//ee - remove currently opened file
//el - remove currently opened directory
//f - new file in currently opened directory on file browser
//d - new directory in currently opened directory on  file browser
//h - toggle code highlight