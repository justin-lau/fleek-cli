"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPrompt = void 0;
const eraseLines_1 = require("../output/utils/eraseLines");
const prompt_1 = require("./prompt");
const selectPrompt = async ({ message, choices = [], initial, onCancel, }) => {
    while (true) {
        const selectedValue = await (0, prompt_1.prompt)({
            type: 'autocomplete',
            message,
            choices,
            initial,
            onCancel,
        });
        if (choices.some((choice) => choice.value === selectedValue)) {
            return selectedValue;
        }
        process.stdout.write((0, eraseLines_1.eraseLines)(2));
    }
};
exports.selectPrompt = selectPrompt;
//# sourceMappingURL=selectPrompt.js.map