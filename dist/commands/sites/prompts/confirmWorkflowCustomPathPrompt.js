"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmWorkflowCustomPathPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmWorkflowCustomPathPrompt = async ({ path, }) => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('workflowToBeSavePathOrOther', { path }),
    initial: false,
});
exports.confirmWorkflowCustomPathPrompt = confirmWorkflowCustomPathPrompt;
//# sourceMappingURL=confirmWorkflowCustomPathPrompt.js.map