export function keyHandler() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', (key) => {
        const keyStr = key.toString();
        if (keyStr !== '\u0003' && keyStr !== 'esc') {
            
        }
    })
}