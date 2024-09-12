import chalk from "chalk";

export class Highlight {
    HighlightOperators(content: any) {
        const operators = ['{', '}', '[', ']', '+', '-', '&', '*', '!', '?', '=', '(', ')', '#', '%', ';', ':', '|'];

        const highlightedText = content.replace(new RegExp(`(${operators.join('|')})`, 'gi'), (match) => {
            return chalk.blue(match);
        })

        return highlightedText;
    }
}