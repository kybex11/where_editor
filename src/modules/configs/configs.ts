const languageArgs: { [key: string]: string } = {
    python: "python",
    ts: "ts-node", 
    js: "node",

    vite: "npm run dev"
};

export function changeArgs(args: string, lang: string): boolean {
    if (lang in languageArgs) {
        languageArgs[lang] = args;
        return true;
    }
    return false;
}

export function getArgs(lang: string): string | null {
    return languageArgs[lang] || null;
}

export function runFile(path: string, lang: string) {

}