"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunScriptProvider = exports.RunScriptProviderImpl = void 0;
const ansi_to_html_1 = __importDefault(require("ansi-to-html"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const terminate_1 = __importDefault(require("terminate"));
const vscode_1 = require("vscode");
class RunScriptProviderImpl {
    codeLenses = new Map();
    _onDidChangeCodeLenses = new vscode_1.EventEmitter();
    onDidChangeCodeLenses = this._onDidChangeCodeLenses.event;
    constructor() {
        vscode_1.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }
    add(script) {
        const codeLensPos = new vscode_1.Position(script.position.line + 1, script.position.character);
        const codeLensRange = new vscode_1.Range(codeLensPos, codeLensPos);
        const codeLens = new vscode_1.CodeLens(codeLensRange, {
            title: "▶️ Run YAML with Script",
            command: "yaml-with-script.run",
            arguments: [script],
        });
        this.codeLenses.set(script.key, [
            ...(this.codeLenses.get(script.key) || []),
            codeLens,
        ]);
        this._onDidChangeCodeLenses.fire();
    }
    clear() {
        this.codeLenses = new Map();
    }
    clearSingle(document) {
        this.codeLenses.set(document.uri.toString(), []);
        this._onDidChangeCodeLenses.fire();
    }
    provideCodeLenses(document, _token) {
        return this.codeLenses.get(document.uri.toString()) || [];
    }
    resolveCodeLens(codeLens, _token) {
        return codeLens;
    }
}
exports.RunScriptProviderImpl = RunScriptProviderImpl;
exports.RunScriptProvider = RunScriptProviderImpl;
let panel;
let scriptRunning = false;
vscode_1.commands.registerCommand("yaml-with-script.run", (script) => {
    if (scriptRunning) {
        vscode_1.window.showWarningMessage("A script is already running!");
        return;
    }
    scriptRunning = true;
    if (!panel) {
        panel = vscode_1.window.createWebviewPanel("yamlWithScriptOutput", "YAML with Script - Output", vscode_1.ViewColumn.Beside, { enableScripts: true, retainContextWhenHidden: true });
    }
    else {
        panel.webview.html = "";
    }
    const htmlPath = path_1.default.join(script.extensionPath, "html", "console.html");
    panel.webview.html = fs_1.default
        .readFileSync(htmlPath, "utf8")
        .replace(/>\s+</g, "><");
    const ansiToHtml = new ansi_to_html_1.default({
        fg: "#cccccc",
        bg: "#1e1e1e",
        colors: {
            0: "#000000",
            1: "#cd3131",
            2: "#0dbc79",
            3: "#e5e510",
            4: "#2472c8",
            5: "#bc3fbc",
            6: "#11a8cd",
            7: "#e5e5e5",
            8: "#666666",
            9: "#f14c4c",
            10: "#23d18b",
            11: "#f5f543",
            12: "#3b8eea",
            13: "#d670d6",
            14: "#29b8db",
            15: "#e5e5e5",
        },
    });
    const config = vscode_1.workspace.getConfiguration("yaml-with-script");
    const baseScript = config.get("baseScript", "");
    const runScriptCommand = baseScript
        ? `source ${baseScript} && ${script.getContent()}`
        : script.getContent();
    const cwd = vscode_1.workspace.workspaceFolders?.[0]?.uri.fsPath;
    const process = (0, child_process_1.spawn)(runScriptCommand, [], { shell: true, cwd });
    panel.onDidDispose(() => {
        if (process.pid) {
            (0, terminate_1.default)(process.pid);
        }
        panel = undefined;
    });
    panel.webview.onDidReceiveMessage((message) => {
        if (message.command === "stopScript" && process.pid) {
            (0, terminate_1.default)(process.pid);
        }
    });
    const handleProcessOutput = (data) => {
        if (panel) {
            panel.webview.postMessage({
                type: "updateContent",
                value: ansiToHtml.toHtml(data.toString("utf-8")),
            });
        }
    };
    process.stdout.on("data", handleProcessOutput);
    process.stderr.on("data", handleProcessOutput);
    process.on("exit", (code, signal) => {
        const message = signal ? "Cancelled!" : `Finished (${code})`;
        if (panel) {
            panel.webview.postMessage({
                type: "scriptStopped",
                value: message,
            });
        }
        scriptRunning = false;
    });
});
//# sourceMappingURL=RunScriptProvider.js.map