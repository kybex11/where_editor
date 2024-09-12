import chalk from "chalk";

export class Highlight {
    HighlightOperators(content: any) {
        const operators = ['{', '}', '[', ']', '+', '-', '&', '*', '!', '?', '=', '(', ')', '#', '%', ';', ':', '|', '>', '<', ',', '.'];

        const highlightedText = content.replace(new RegExp(`(${operators.join('|')})`, 'gi'), (match) => {
            return chalk.blue(match);
        })

        return highlightedText;
    }

    HighlightCode(content: any, lang: string) {
        if (lang == "ts" || lang == "js") {
        const operators = ['let', 'const', 'var', 'function', 'delete', 'void', 'public', 'private', 'generator', 'async', 'await', 'class', 'type', 'interface', 'enum', 'module', 'namespace', 'import', 'export', 'default', 'abstract', 'any', 'as', 'boolean', 'break', 'case', 'switch', 'catch', 'continue', 'debugger', 'declare', 'do', 'else', 'if', 'for', 'while', 'extends', 'false', 'finally', 'from', 'get', 'global', 'implements', 'infer', 'instanceof', 'never', 'new', 'null', 'number', 'object', 'if', 'protected', 'readonly', 'require', 'return', 'string', 'super', 'symbol', 'this', 'throw', 'true', 'try', 'type', 'typeof', 'with', 'yield', 'undefined'];

        const highlightedText = content.replace(new RegExp(`(${operators.join('|')})`, 'gi'), (match) => {
            return chalk.red(match);
        })

        return highlightedText;
        }
    }
}