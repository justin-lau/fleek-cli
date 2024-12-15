"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionSlugOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const getFunctionSlugOrPrompt = async ({ slug, }) => {
    if (slug && (0, utils_validation_1.isFunctionSlugValid)({ slug })) {
        return slug;
    }
    if (!slug)
        return;
    throw new errors_1.FleekFunctionSlugNotValidError({ slug });
};
exports.getFunctionSlugOrPrompt = getFunctionSlugOrPrompt;
//# sourceMappingURL=getFunctionSlugOrPrompt.js.map