"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const vscode_1 = require("vscode");
const yaml_1 = __importDefault(require("yaml"));
class Script {
    key;
    document;
    position;
    path;
    extensionPath;
    codelensPosition;
    index;
    constructor(document, position, index, path, extensionPath) {
        this.key = document.uri.toString();
        this.document = document;
        this.position = position;
        this.codelensPosition = new vscode_1.Position(position.line + 1, position.character);
        this.index = index;
        this.path = path;
        this.extensionPath = extensionPath;
    }
    getRangeToPosition(lineStart, columnStart, lineEnd, columnEnd) {
        return new vscode_1.Range(this.position.translate(lineStart, columnStart), this.position.translate(lineEnd, columnEnd));
    }
    getContent() {
        const pathParts = this.path.split(".");
        let yamlDoc = yaml_1.default.parse(this.document.getText());
        for (const part of pathParts) {
            if (yamlDoc[part] !== undefined) {
                yamlDoc = yamlDoc[part];
            }
            else {
                return undefined;
            }
        }
        return yamlDoc[this.index];
    }
}
exports.Script = Script;
//# sourceMappingURL=Script.js.map