"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPrompt = void 0;
const prompt_1 = require("./prompt");
const listPrompt = async ({ message, initial, onCancel, }) => {
    return (0, prompt_1.prompt)({
        type: 'list',
        message,
        initial: initial?.join(', '),
        onCancel,
    });
};
exports.listPrompt = listPrompt;
//# sourceMappingURL=listPrompt.js.map