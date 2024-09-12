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

export function centeredText(text: string): void {
    clear();
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