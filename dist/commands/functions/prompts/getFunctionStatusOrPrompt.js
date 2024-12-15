"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionStatusOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const getFunctionStatusOrPrompt = async ({ status, }) => {
    if (status && (0, utils_validation_1.isFunctionStatusValid)({ status })) {
        return status;
    }
    throw new errors_1.FleekFunctionStatusNotValidError({});
};
exports.getFunctionStatusOrPrompt = getFunctionStatusOrPrompt;
//# sourceMappingURL=getFunctionStatusOrPrompt.js.map