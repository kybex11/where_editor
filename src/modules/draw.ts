import { clear } from "./tools.js";

export function draw(content: any) {
    clear();
    process.stdout.write(content);
} 