"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptProvider = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const yaml_1 = require("yaml");
const RunScriptProvider_1 = require("./RunScriptProvider");
const Script_1 = require("./Script");
const ShellcheckProvider_1 = require("./ShellcheckProvider");
class ScriptProvider {
    extensionPath = "";
    timer;
    runScriptProvider = new RunScriptProvider_1.RunScriptProvider();
    shellcheckProvider = new ShellcheckProvider_1.ShellcheckProvider();
    initContext(context) {
        this.extensionPath = context.extensionPath;
        const codeLensSubscription = vscode_1.languages.registerCodeLensProvider({ pattern: "**/*.{yaml,yml}" }, this.runScriptProvider);
        context.subscriptions.push(codeLensSubscription);
    }
    clear() {
        this.runScriptProvider.clear();
        this.shellcheckProvider.clear();
    }
    analyzeWithTimeout() {
        if (this.timer) {
            this.timer.refresh();
        }
        else {
            this.timer = setTimeout(() => {
                this.analyze();
            }, 500);
        }
    }
    analyze() {
        const config = vscode_1.workspace.getConfiguration("yaml-with-script");
        const enabled = config.get("enabled");
        if (!enabled) {
            this.clear();
            return;
        }
        try {
            const config = vscode_1.workspace.getConfiguration("yaml-with-script");
            const shellcheckFolder = config.get("shellcheckFolder") || "";
            child_process_1.default.execSync(path_1.default.join(shellcheckFolder, "shellcheck --version"), {
                encoding: "utf-8",
            });
        }
        catch (error) {
            this.clear();
            vscode_1.window.showErrorMessage("Could not start extension, shellsheck not installed properly!" + error);
            return;
        }
        const activeTextEditor = vscode_1.window.activeTextEditor;
        if (!activeTextEditor) {
            return;
        }
        const document = activeTextEditor.document;
        this.clear();
        try {
            const text = document.getText();
            const yaml = (0, yaml_1.parseDocument)(text);
            if ((0, yaml_1.isMap)(yaml.contents)) {
                yaml.contents.items.forEach((item) => {
                    this.searchScripts(document, item, item.key.toString());
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    searchScripts(document, yaml, path) {
        if ((0, yaml_1.isMap)(yaml.value)) {
            yaml.value.items.forEach((item) => {
                this.searchScripts(document, item, path + "." + item.key);
            });
            return;
        }
        const key = yaml.key;
        if (!["before_script", "script", "after_script"].includes(key.toString())) {
            return;
        }
        const items = yaml.value.items;
        const itemCount = items.length - 1;
        const script = new Script_1.Script(document, this.offsetToLineCol(document.getText(), items[itemCount].range[0]), itemCount, path, this.extensionPath);
        this.runScriptProvider.add(script);
        this.shellcheckProvider.add(script);
    }
    offsetToLineCol(yamlText, offset) {
        const lines = yamlText.slice(0, offset).split("\n");
        const line = lines.length;
        const col = lines[lines.length - 1].length;
        return new vscode_1.Position(line - 1, col - 1);
    }
}
exports.ScriptProvider = ScriptProvider;
//# sourceMappingURL=ScriptProvider.js.map