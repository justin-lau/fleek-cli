"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterApplicationNameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const isNameValid_1 = require("../utils/isNameValid");
const enterApplicationNameOrPrompt = async (args) => {
    if (args.name && (0, isNameValid_1.isNameValid)({ name: args.name })) {
        return args.name;
    }
    if (args.name && !(0, isNameValid_1.isNameValid)({ name: args.name })) {
        throw new errors_1.ApplicationNameInvalidError({ name: args.name });
    }
    return (0, textPrompt_1.textPrompt)({
        message: `${(0, translation_1.t)('typeAppName')}:`,
        validate: (name) => (0, isNameValid_1.isNameValid)({ name })
            ? true
            : (0, translation_1.t)('invalidNameUseXofYAndRegex', {
                min: '3',
                max: '30',
            }),
        initial: args.application?.name,
    });
};
exports.enterApplicationNameOrPrompt = enterApplicationNameOrPrompt;
//# sourceMappingURL=enterApplicationNameOrPrompt.js.map