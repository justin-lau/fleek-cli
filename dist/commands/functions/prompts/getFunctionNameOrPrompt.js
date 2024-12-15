"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionNameOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const enterFunctionNamePrompt_1 = require("./enterFunctionNamePrompt");
const getFunctionNameOrPrompt = async ({ name, }) => {
    if (name && (0, utils_validation_1.isFunctionNameValid)({ name })) {
        return name;
    }
    if (name && !(0, utils_validation_1.isFunctionNameValid)({ name })) {
        throw new errors_1.FleekFunctionNameNotValidError({ name });
    }
    return (0, enterFunctionNamePrompt_1.enterFunctionNamePrompt)();
};
exports.getFunctionNameOrPrompt = getFunctionNameOrPrompt;
//# sourceMappingURL=getFunctionNameOrPrompt.js.map