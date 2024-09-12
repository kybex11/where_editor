import { clear } from "./ct";

export function draw(content: any) {
    clear();
    process.stdout.write(content);
} 