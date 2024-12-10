export function keyHandler(): string {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', (key) => {
        const keyStr = key.toString();
        if (keyStr !== '\u0003' && keyStr !== 'esc') {
            return keyStr;
        } else if (keyStr == 'esc') {
            return 'weight';
        } else if (keyStr == '\u0003') {
            process.stdin.setRawMode(false);
            process.exit();
        }
        return 'weight';
    })
    
    return 'weight';
}