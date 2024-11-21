import { FileBrowser } from "./browser/filebrowser.js";

export function clear() {
    process.stdout.write('\x1B[2J');
}

export function exit() {
    process.exit();
}

export function exitError(error: any) {
    console.error(error);
    process.exit();
}

export function centeredText(text: string, clearing: boolean): void {
    
    if (clearing) {
        clear();
    }
    
    process.stdout.write('\x1B[1;1f'); // Move cursor to top-left corner

    const terminalWidth = process.stdout.columns;
    const terminalHeight = process.stdout.rows;
    const textLength = text.length;
    const numLines = text.split('\n').length;
    const centerX = Math.floor(terminalWidth / 2) - Math.floor(textLength / 2);
    const centerY = Math.floor(terminalHeight / 2) - Math.floor(numLines / 2);

    process.stdout.write(`\x1B[${centerY};${centerX}f`);
    process.stdout.write(text + '\n');
}

export function bottomText(text: string, clearing: boolean): void {
    if (clearing) {
        clear();
    }

    process.stdout.write('\x1B[1;1f'); // Move cursor to top-left corner

    const terminalWidth = process.stdout.columns;
    const fullText = text.padEnd(terminalWidth, ' ');

    const centerY = process.stdout.rows;
    
    process.stdout.write(`\x1B[44m\x1B[37m`); // blue bg, white text
    process.stdout.write(`\x1B[${centerY};1f${fullText}`);
    process.stdout.write('\x1B[0m\n'); // reset styles

}

export function exitEscapeHandler() {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
        if (data.toString() === '\u001B') { //esc key
            clear();
            exit();
        }
    })
}

export function exitHandler() {
   process.on('SIGINT', () => { //ctrl + c key
    clear();
    exit();
   })
}

export function addFileBrowserHandler(f: boolean) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
        if (f) {
            if (data.toString() === 'f') {
                process.stdin.setRawMode(false);
                clear();
                FileBrowser();
            }  
        }
    })
}