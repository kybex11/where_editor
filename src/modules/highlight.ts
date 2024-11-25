import chalk from "chalk";

export class Highlight {
    HighlightOperators(content: any) {
        const operators = ['{', '}', '[', ']', '\\+', '-', '&', '\\*', '!', '\\?', '=', '\\(', '\\)', '#', '%', ';', ':', '\\|', '>', '<', ',', '.'];

        const regex = new RegExp(`(${operators.join('|')})`, 'g');

        const highlightedText = content.replace(regex, (match) => {
            return chalk.blue(match);
        });

        return highlightedText;
    }
    HighlightCode(content: any, lang: string) {
        if (lang == "ts" || lang == "js") {
        const operators = ['let', 'const', 'var', 'function', 'delete', 'void', 'public', 'private', 'async', 'await', 'class', 'type', 'interface', 'enum', 'module', 'import', 'export', 'default', 'as', 'break', 'case', 'switch', 'catch', 'continue', 'declare', 'do', 'else', 'if', 'for', 'while', 'extends', 'false', 'finally', 'from', 'get', 'global', 'instanceof', 'new', 'null', 'object', 'if', 'protected', 'readonly', 'require', 'return', 'string', 'super', 'this', 'throw', 'true', 'try', 'type', 'typeof','yield' ];

        const highlightedText = content.replace(new RegExp(`(${operators.join('|')})`, 'gi'), (match) => {
            return chalk.red(match);
        })

        return highlightedText;
        } else if (lang == "c") {
            const operators = [ 'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long', 'register', 'restrict', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', 'sizeof', 'int', 'char', 'float', 'double', 'void', 'struct', 'union', 'enum', 'auto', 'extern', 'register', 'static','const', 'volatile', 'restrict', '#include', '#define'];
            const highlightedText = content.replace(new RegExp(`(${operators.join('|')})`, 'gi'), (match) => {
                return chalk.red(match);
            })
    
            return highlightedText;
        }
    }
}