"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionPathOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const isValidPath = async (path) => await (0, utils_validation_1.isFunctionPathValid)({ fileOrFolderPath: path });
const getFunctionPathOrPrompt = async ({ path, }) => {
    let result = path;
    if (!result) {
        const p = await (0, textPrompt_1.textPrompt)({
            message: (0, translation_1.t)('typeFunctionCodePath'),
            validate: (path) => (0, utils_validation_1.isFunctionPathValid)({ fileOrFolderPath: path }) ||
                (0, translation_1.t)('filePathValidWarning'),
        });
        result = p;
    }
    const hasValidPath = await isValidPath(result);
    if (!hasValidPath) {
        throw new errors_1.FleekFunctionPathNotValidError({ path: result });
    }
    const isFolder = await (0, utils_validation_1.isValidFolder)(result);
    if (isFolder) {
        return `${result}/index.js`;
    }
    return result;
};
exports.getFunctionPathOrPrompt = getFunctionPathOrPrompt;
//# sourceMappingURL=getFunctionPathOrPrompt.js.map