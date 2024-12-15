"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsNameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const getEnsNameOrPrompt = async ({ name }) => {
    if (name) {
        if ((0, utils_validation_1.isEnsValid)({ name })) {
            return name;
        }
        throw new errors_1.EnsNameInvalidError({ ensRecord: { name } });
    }
    return (0, textPrompt_1.textPrompt)({
        message: `${(0, translation_1.t)('ensEnterName')}:`,
        validate: (partialEns) => (0, utils_validation_1.isEnsValid)({ name: partialEns }) || (0, translation_1.t)('ensIncorrectForm'),
    });
};
exports.getEnsNameOrPrompt = getEnsNameOrPrompt;
//# sourceMappingURL=getEnsNameOrPrompt.js.map