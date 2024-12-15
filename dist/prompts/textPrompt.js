"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textPrompt = void 0;
const prompt_1 = require("./prompt");
const textPrompt = async ({ message, initial, validate, onCancel, }) => {
    return (0, prompt_1.prompt)({ type: 'text', message, initial, validate, onCancel });
};
exports.textPrompt = textPrompt;
//# sourceMappingURL=textPrompt.js.map