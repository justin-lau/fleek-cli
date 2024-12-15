"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectNameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const getProjectNameOrPrompt = async ({ name, }) => {
    if (name && (0, utils_validation_1.isProjectNameValid)({ name })) {
        return name;
    }
    if (name && !(0, utils_validation_1.isProjectNameValid)({ name })) {
        throw new errors_1.ProjectInvalidNameError({ name });
    }
    return (0, textPrompt_1.textPrompt)({
        message: `${(0, translation_1.t)('enterProjectName')}:`,
        validate: (partialName) => (0, utils_validation_1.isProjectNameValid)({ name: partialName }) ||
            (0, translation_1.t)('mustHaveXandYValidChars', { min: '3', max: '30' }),
    });
};
exports.getProjectNameOrPrompt = getProjectNameOrPrompt;
//# sourceMappingURL=getProjectNameOrPrompt.js.map