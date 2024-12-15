"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmFileOverridePrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmFileOverridePrompt = async ({ path, }) => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('fileExistAskIfOverwrite', { path }),
    initial: true,
});
exports.confirmFileOverridePrompt = confirmFileOverridePrompt;
//# sourceMappingURL=confirmFileOverridePrompt.js.map