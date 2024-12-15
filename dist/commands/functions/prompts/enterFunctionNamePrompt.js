"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterFunctionNamePrompt = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const enterFunctionNamePrompt = async () => (0, textPrompt_1.textPrompt)({
    message: `${(0, translation_1.t)('typeNewFunctionName')}:`,
    validate: (partialName) => (0, utils_validation_1.isFunctionNameValid)({ name: partialName }) || (0, translation_1.t)('functionInvalidName'),
});
exports.enterFunctionNamePrompt = enterFunctionNamePrompt;
//# sourceMappingURL=enterFunctionNamePrompt.js.map