"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const RunScriptProvider_1 = require("../RunScriptProvider");
// Mock für das TextDocument
class MockTextDocument {
    uri = { toString: () => "test-document" };
    fileName = "";
    isUntitled = false;
    languageId = "";
    version = 1;
    isDirty = false;
    isClosed = false;
    save() {
        return Promise.resolve(true);
    }
    eol = 1;
    lineCount = 1;
    lineAt() {
        return { text: "" };
    }
    offsetAt() {
        return 0;
    }
    positionAt() {
        return new vscode_1.Position(0, 0);
    }
    getText() {
        return "";
    }
    getWordRangeAtPosition() {
        return undefined;
    }
    validateRange() {
        return new vscode_1.Range(0, 0, 0, 0);
    }
    validatePosition() {
        return new vscode_1.Position(0, 0);
    }
}
suite("RunScriptProvider Test Suite", () => {
    let provider;
    let mockDocument;
    setup(() => {
        provider = new RunScriptProvider_1.RunScriptProviderImpl();
        mockDocument = new MockTextDocument();
    });
    suiteTeardown(() => {
        vscode_1.window.showInformationMessage("RunScriptProvider tests done!");
    });
    test("should add a new CodeLens for a script", async () => {
        const mockScript = {
            key: mockDocument.uri.toString(),
            position: { line: 0, character: 0 },
            getContent: () => 'echo "test"',
        };
        provider.add(mockScript);
        const codeLensesResult = provider.provideCodeLenses(mockDocument, vscode_languageclient_1.CancellationToken.None);
        const codeLenses = await Promise.resolve(codeLensesResult);
        assert.ok(codeLenses);
        assert.strictEqual(codeLenses.length, 1);
        assert.deepStrictEqual(codeLenses[0].command, {
            title: "▶️ Run YAML with Script",
            command: "yaml-with-script.run",
            arguments: [mockScript],
        });
    });
    test("should support multiple CodeLenses for the same document", async () => {
        const mockScript1 = {
            key: mockDocument.uri.toString(),
            position: { line: 0, character: 0 },
            getContent: () => 'echo "test1"',
        };
        const mockScript2 = {
            key: mockDocument.uri.toString(),
            position: { line: 1, character: 0 },
            getContent: () => 'echo "test2"',
        };
        provider.add(mockScript1);
        provider.add(mockScript2);
        const codeLensesResult = provider.provideCodeLenses(mockDocument, vscode_languageclient_1.CancellationToken.None);
        const codeLenses = await Promise.resolve(codeLensesResult);
        assert.ok(codeLenses);
        assert.strictEqual(codeLenses.length, 2);
    });
    test("should clear all CodeLenses for a document", async () => {
        const mockScript = {
            key: mockDocument.uri.toString(),
            position: { line: 0, character: 0 },
            getContent: () => 'echo "test"',
        };
        provider.add(mockScript);
        provider.clearSingle(mockDocument);
        const codeLensesResult = provider.provideCodeLenses(mockDocument, vscode_languageclient_1.CancellationToken.None);
        const codeLenses = await Promise.resolve(codeLensesResult);
        assert.ok(codeLenses);
        assert.strictEqual(codeLenses.length, 0);
    });
    test("should return empty array when no CodeLenses exist", async () => {
        const codeLensesResult = provider.provideCodeLenses(mockDocument, vscode_languageclient_1.CancellationToken.None);
        const codeLenses = await Promise.resolve(codeLensesResult);
        assert.ok(codeLenses);
        assert.strictEqual(codeLenses.length, 0);
    });
    test("should fire onDidChangeCodeLenses when adding CodeLens", (done) => {
        provider.onDidChangeCodeLenses(() => {
            done();
        });
        const mockScript = {
            key: mockDocument.uri.toString(),
            position: { line: 0, character: 0 },
            getContent: () => 'echo "test"',
        };
        provider.add(mockScript);
    });
    test("should fire onDidChangeCodeLenses when clearing CodeLenses", (done) => {
        provider.onDidChangeCodeLenses(() => {
            done();
        });
        provider.clearSingle(mockDocument);
    });
    test("should create CodeLens with correct position", async () => {
        const mockScript = {
            key: mockDocument.uri.toString(),
            position: { line: 5, character: 10 },
            getContent: () => 'echo "test"',
        };
        provider.add(mockScript);
        const codeLensesResult = provider.provideCodeLenses(mockDocument, vscode_languageclient_1.CancellationToken.None);
        const codeLenses = await Promise.resolve(codeLensesResult);
        assert.ok(codeLenses);
        assert.strictEqual(codeLenses[0].range.start.line, 6);
        assert.strictEqual(codeLenses[0].range.start.character, 10);
    });
});
//# sourceMappingURL=RunScriptProvider.test.js.map