"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmInstallCommandPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmInstallCommandPrompt = async ({ installCommand, }) => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('isGenInstallCmdCorrect', { installCommand }),
    initial: true,
});
exports.confirmInstallCommandPrompt = confirmInstallCommandPrompt;
//# sourceMappingURL=confirmInstallCommandPrompt.js.map