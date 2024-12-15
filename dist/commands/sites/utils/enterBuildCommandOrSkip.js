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
    return (0, enterBuildCommandPrompt_1.enterBuildCommandPrompt)();
};
exports.selectBuildCommandOrSkip = selectBuildCommandOrSkip;
//# sourceMappingURL=enterBuildCommandOrSkip.js.map