import { Highlight } from "./highlight.js";
import { TempManager } from "./storage.js";

export async function printCodeWithLines() {
    const tempManager = new TempManager();
    const highlight = new Highlight();
    const fileContent = await tempManager.Get();
    if (fileContent === null) {
        console.log("Error: TMP Not Created. Restart Program");
        return;
    }
    const lines = fileContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const hig1 = highlight.HighlightCode(lines[i], 'ts');
        console.log(`${i + 1} ${hig1}`);
    }
}