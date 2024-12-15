"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUserWantsToSpecifyInstallCommandPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmUserWantsToSpecifyInstallCommandPrompt = async () => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('specifyinstallCmdOpt'),
    initial: true,
});
exports.confirmUserWantsToSpecifyInstallCommandPrompt = confirmUserWantsToSpecifyInstallCommandPrompt;
//# sourceMappingURL=confirmUserWantsToSpecifyInstallCommandPrompt.js.map