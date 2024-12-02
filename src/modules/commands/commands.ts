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
    
    if (command === 'r') {
        const launchArgs = getArgs(getLanguage());
        return true;
    } else if (command === 'f') {
        // new file in currently opened directory in file browser
        return true;
    } else if (command === 'd') {
        //new directory in currently opened directory in file browser
        return true;
    } else if (command === 'h') {
        // toggle code highlight
        return true;
    } else if (command === 'rd') {
        // run current workspace
        return true;
    } else if (command === 'el') {
        // remove currently opened directory
        return true;
    } else if (command === 'ee') {
        // remove currently opened file
        return true;
    }

    return false;

}

//! - run a terminal command
//r - run current file
//rd - run current workspace
//ee - remove currently opened file
//el - remove currently opened directory
//f - new file in currently opened directory on file browser
//d - new directory in currently opened directory on  file browser
//h - toggle code highlight