"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterSiteNamePrompt = void 0;
const utils_validation_1 = require("@fleek-platform/utils-validation");
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
const enterSiteNamePrompt = async () => (0, textPrompt_1.textPrompt)({
    message: `${(0, translation_1.t)('typeNewSiteName')}:`,
    validate: (partialName) => (0, utils_validation_1.isSiteNameValid)({ name: partialName }) || (0, translation_1.t)('invalidNameUseAlphDashes'),
});
exports.enterSiteNamePrompt = enterSiteNamePrompt;
//# sourceMappingURL=enterSiteNamePrompt.js.map