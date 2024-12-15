"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPrompt = void 0;
const prompt_1 = require("./prompt");
const confirmPrompt = async ({ message, initial, onCancel, }) => {
    return (0, prompt_1.prompt)({
        type: 'confirm',
        message,
        initial,
        onCancel,
    });
};
exports.confirmPrompt = confirmPrompt;
//# sourceMappingURL=confirmPrompt.js.map