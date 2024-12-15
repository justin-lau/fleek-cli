"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUseExistingSitePrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmUseExistingSitePrompt = async () => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('foundSiteLinkToExisting'),
    initial: true,
});
exports.confirmUseExistingSitePrompt = confirmUseExistingSitePrompt;
//# sourceMappingURL=confirmUseExistingSitePrompt.js.map