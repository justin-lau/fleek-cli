"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterInstallCommandPrompt = void 0;
const textPrompt_1 = require("../../../prompts/textPrompt");
const translation_1 = require("../../../utils/translation");
// TODO: All these prompts should be transformed into a generic method
const enterInstallCommandPrompt = async () => (0, textPrompt_1.textPrompt)({
    message: `${(0, translation_1.t)('specifyInstallCmd')}:`,
});
exports.enterInstallCommandPrompt = enterInstallCommandPrompt;
//# sourceMappingURL=enterInstallCommandPrompt.js.map