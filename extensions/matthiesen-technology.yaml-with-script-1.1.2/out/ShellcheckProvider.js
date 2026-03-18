"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellcheckProvider = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
class ShellcheckProvider {
    diagnostics = vscode_1.languages.createDiagnosticCollection("yaml-with-script-diagnostics");
    clear() {
        this.diagnostics.clear();
    }
    add(script) {
        const config = vscode_1.workspace.getConfiguration("yaml-with-script");
        const severity = config.get("severity");
        const dialect = config.get("dialect");
        const shellcheckFolder = config.get("shellcheckFolder", "");
        const command = [];
        command.push(`printf '%s' '${script.getContent()}' | `);
        command.push(path_1.default.join(shellcheckFolder, "shellcheck"));
        command.push(`--format=json`);
        command.push(`--severity=${severity}`);
        command.push(dialect === "inline" ? "" : `--shell=${dialect}`);
        command.push("/dev/stdin");
        command.push("|| true");
        const output = child_process_1.default.execSync(command.join(" "), { encoding: "utf-8" });
        const issues = JSON.parse(output);
        issues.forEach((issue) => {
            let severity;
            switch (issue.level) {
                case "error":
                    severity = vscode_1.DiagnosticSeverity.Error;
                    break;
                case "warning":
                    severity = vscode_1.DiagnosticSeverity.Warning;
                    break;
                case "info":
                    severity = vscode_1.DiagnosticSeverity.Information;
                    break;
                case "style":
                    severity = vscode_1.DiagnosticSeverity.Hint;
                    break;
                default:
                    severity = vscode_1.DiagnosticSeverity.Information;
                    break;
            }
            const position = new vscode_1.Range(script.position.translate(issue.line, issue.column), script.position.translate(issue.endLine, issue.endColumn));
            const diagnostic = new vscode_1.Diagnostic(position, issue.message, severity);
            diagnostic.source = "shellcheck";
            diagnostic.code = {
                value: `SC${issue.code}`,
                target: vscode_1.Uri.parse(`https://www.shellcheck.net/wiki/SC${issue.code}`),
            };
            if (this.diagnostics.has(script.document.uri)) {
                const existingDiagnostics = this.diagnostics.get(script.document.uri) ?? [];
                this.diagnostics.set(script.document.uri, [
                    diagnostic,
                    ...existingDiagnostics,
                ]);
            }
            else {
                this.diagnostics.set(script.document.uri, [diagnostic]);
            }
        });
    }
}
exports.ShellcheckProvider = ShellcheckProvider;
//# sourceMappingURL=ShellcheckProvider.js.map