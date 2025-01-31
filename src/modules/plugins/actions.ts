import { Logs } from "../logs/logs.js";
const logs = new Logs();

export class Action {
    printLog(_prefix: string, _content: string) {
        logs.writePluginLogs(_prefix, _content);
    }
}