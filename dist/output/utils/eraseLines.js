"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseLines = void 0;
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const eraseLines = (numberOfLines) => {
    return ansi_escapes_1.default.eraseLines(numberOfLines);
};
exports.eraseLines = eraseLines;
//# sourceMappingURL=eraseLines.js.map