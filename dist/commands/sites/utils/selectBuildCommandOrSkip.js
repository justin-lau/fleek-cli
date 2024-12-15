"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBuildCommandOrSkip = void 0;
const confirmIncludeBuildCommandPrompt_1 = require("../prompts/confirmIncludeBuildCommandPrompt");
const enterBuildCommandPrompt_1 = require("../prompts/enterBuildCommandPrompt");
const selectBuildCommandOrSkip = async () => {
    const includeBuildCommand = await (0, confirmIncludeBuildCommandPrompt_1.confirmIncludeBuildCommandPrompt)();
    if (!includeBuildCommand) {
        return;
    }
    const buildCommand = await (0, enterBuildCommandPrompt_1.enterBuildCommandPrompt)();
    return buildCommand;
};
exports.selectBuildCommandOrSkip = selectBuildCommandOrSkip;
//# sourceMappingURL=selectBuildCommandOrSkip.js.map