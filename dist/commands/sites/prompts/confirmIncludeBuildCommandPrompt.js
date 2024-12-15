"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmIncludeBuildCommandPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const translation_1 = require("../../../utils/translation");
const confirmIncludeBuildCommandPrompt = async () => (0, confirmPrompt_1.confirmPrompt)({
    message: (0, translation_1.t)('includeOptBuildCmd', { build: 'build' }),
    initial: true,
});
exports.confirmIncludeBuildCommandPrompt = confirmIncludeBuildCommandPrompt;
//# sourceMappingURL=confirmIncludeBuildCommandPrompt.js.map