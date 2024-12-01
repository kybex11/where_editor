export function checkCommand(command: string){
    if (command.startsWith('!')) {
        const args = command.slice(1).trim();
        if (args.length > 0) {
            // run command from terminal
        }
    }

    if (command === 'r') {
        //run current file
    }

    if (command === 'f') {
        // new file in currently opened directory in file browser
    }

    if (command === 'd') {
        //new directory in currently opened directory in file browser
    }

    if (command === 'h') {
        // toggle code highlight
    }

    if (command === 'rd') {
        // run current workspace
    }

    if (command === 'rl') {
        // remove currently opened directory
    }

}

//! - run a terminal command
//r - run current file
//rd - run current workspace
//r - remove currently opened file
//rl - remove currently opened directory
//f - new file in currently opened directory on file browser
//d - new directory in currently opened directory on  file browser
//h - toggle code highlight