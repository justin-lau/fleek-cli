"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getFunctionOrPrompt = async ({ name, sdk, }) => {
    if (name) {
        return sdk.functions().get({ name });
    }
    const functions = await sdk.functions().list();
    if (!functions.length) {
        throw new errors_1.FleekFunctionsNotFoundError({});
    }
    const selectedFunctionId = await (0, selectPrompt_1.selectPrompt)({
        message: (0, translation_1.t)('commonSelectXFromList', { subject: (0, translation_1.t)('function') }),
        choices: functions.map((f) => ({ title: f.name, value: f.id })),
    });
    const fnMatch = functions.find((f) => f.id === selectedFunctionId);
    if (!fnMatch)
        return;
    return fnMatch;
};
exports.getFunctionOrPrompt = getFunctionOrPrompt;
//# sourceMappingURL=getFunctionOrPrompt.js.map