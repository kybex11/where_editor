import { getArgs } from "../configs/configs.js";
import { writeCommand } from "../terminal/terminal.js";
import { getLanguage } from "../lines.js";
import { FileSystem, DirectorySystem } from "./files.js";
import { Translate } from "../languages/translate.js";

let fileBrowserDirectory: string = '';

export function checkCommand(command: string): boolean {
    const translate = new Translate();
    
    if (command.startsWith('!')) {
        const args = command.slice(1).trim();
        if (args.length > 0) {
            console.log(writeCommand(args));
            return true;
        }
    } else if (command.startsWith('f')) {
        const args = command.slice(1).trim();
            
        if (args.length > 0) {
            const file = new FileSystem();

            file.create(fileBrowserDirectory, args);
            return true;
        }
    } else if (command.startsWith('d')) {
        const args = command.slice(1).trim(); 

        if (args.length > 0) {
            const directory = new DirectorySystem();

            directory.create(`${fileBrowserDirectory}/${args}`);
            return true;
        }
    }

    switch(command) {
        case 'r':
            // run current file
            const launchArgs = getArgs(getLanguage());
            console.log(writeCommand(launchArgs));

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
        case 'tgl':
            // toggle language
            translate.toggleLang();
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
//f - new file in currently opened directory in file browser
//d - new directory in currently opened directory in file browser
//tgl - toggle language


export function updateFileBrowserDirectory(new_: string) {
    fileBrowserDirectory = new_;
}