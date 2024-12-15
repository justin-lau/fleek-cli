"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBlake3Hash = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const hash_wasm_1 = require("hash-wasm");
const calculateBlake3Hash = async ({ filePath, onFailure, }) => {
    try {
        const buffer = await promises_1.default.readFile(filePath);
        return await (0, hash_wasm_1.blake3)(buffer);
    }
    catch {
        if (typeof onFailure === 'function') {
            onFailure();
        }
    }
};
exports.calculateBlake3Hash = calculateBlake3Hash;
//# sourceMappingURL=blake3.js.map