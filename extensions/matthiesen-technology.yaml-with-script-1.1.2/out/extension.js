"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const ScriptProvider_1 = require("./ScriptProvider");
const scriptProvider = new ScriptProvider_1.ScriptProvider();
async function activate(context) {
    scriptProvider.initContext(context);
    scriptProvider.analyze();
    vscode_1.window.onDidChangeActiveTextEditor((editor) => scriptProvider.analyze(), context.subscriptions);
    vscode_1.workspace.onDidChangeTextDocument((e) => scriptProvider.analyzeWithTimeout(), context.subscriptions);
    vscode_1.workspace.onDidSaveTextDocument((doc) => scriptProvider.analyze(), context.subscriptions);
}
function deactivate() {
    scriptProvider.clear();
}
//# sourceMappingURL=extension.js.map