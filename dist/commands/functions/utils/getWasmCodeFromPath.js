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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWasmCodeFromPath = void 0;
const fs = __importStar(require("node:fs"));
const os = __importStar(require("node:os"));
const errors_1 = require("@fleek-platform/errors");
const cli_progress_1 = __importDefault(require("cli-progress"));
const eciesjs_1 = require("eciesjs");
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const PUBLIC_KEY = '02de6500ea852d2f4bdc9b6812ac76477e45eae556998d357cfa84e5a0a71bddb4';
const getWasm = async (filePath) => {
    const buffer = await fs.promises.readFile(filePath);
    if (buffer.length < 8) {
        return null;
    }
    // WebAssembly namespace is only supported in dom in typescript
    // https://webassembly.github.io/spec/core/binary/modules.html#binary-module
    const wasmMagicNumber = [0x00, 0x61, 0x73, 0x6d];
    for (let i = 0; i < 4; i++) {
        if (buffer[i] !== wasmMagicNumber[i]) {
            return null;
        }
    }
    return buffer;
};
const enryptCode = async (args) => {
    const { filePath } = args;
    const buffer = await getWasm(filePath);
    if (!buffer) {
        cli_1.output.error((0, translation_1.t)('invalidWasmCode', { path: filePath }));
        throw new errors_1.FleekFunctionInvalidWasmCodeError({});
    }
    const progressBar = new cli_progress_1.default.SingleBar({
        format: (0, translation_1.t)('uploadProgress', {
            action: (0, translation_1.t)('encryptingCode'),
        }),
    }, cli_progress_1.default.Presets.shades_grey);
    let tempDir;
    if (!cli_1.output.debugEnabled) {
        tempDir = os.tmpdir();
    }
    else {
        tempDir = '.fleek';
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
    }
    const outFile = `${tempDir}/function.wasm`;
    progressBar.start(100, 10);
    try {
        const encryptedData = (0, eciesjs_1.encrypt)(PUBLIC_KEY, buffer);
        progressBar.update(50);
        await fs.promises.writeFile(outFile, encryptedData);
    }
    catch (error) {
        progressBar.stop();
        throw new errors_1.FleekFunctionWasmEncryptionFailedError({});
    }
    progressBar.update(100);
    progressBar.stop();
    return outFile;
};
const getWasmCodeFromPath = async (args) => {
    const { filePath } = args;
    if (!fs.existsSync(filePath)) {
        throw new errors_1.FleekFunctionPathNotValidError({ path: filePath });
    }
    return enryptCode({ filePath });
};
exports.getWasmCodeFromPath = getWasmCodeFromPath;
//# sourceMappingURL=getWasmCodeFromPath.js.map