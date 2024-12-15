"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUserWantsInstallCommandPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmUserWantsInstallCommandPrompt = async () => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('runInstallCmdBeforeBuild'),
    initial: false,
});
exports.confirmUserWantsInstallCommandPrompt = confirmUserWantsInstallCommandPrompt;
//# sourceMappingURL=confirmUserWantsInstallCommandPrompt.js.map