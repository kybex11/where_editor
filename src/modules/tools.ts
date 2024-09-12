export function clear() {
    console.clear();
}

export function exitf() {
    process.exit();
}

export function exitError(error: any) {
    console.error(error);
    process.exit();
}