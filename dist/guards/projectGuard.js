"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectGuard = void 0;
const cli_1 = require("../cli");
const switch_1 = require("../commands/projects/switch");
const config_1 = require("../config");
const translation_1 = require("../utils/translation");
const sdkGuard_1 = require("./sdkGuard");
const projectGuard = async () => {
    const projectId = config_1.config.projectId.get();
    if (projectId) {
        return;
    }
    cli_1.output.warn((0, translation_1.t)('projectSelectRequiredStarPrjFlow'));
    cli_1.output.printNewLine();
    await (0, sdkGuard_1.sdkGuard)(switch_1.switchProjectAction)();
};
exports.projectGuard = projectGuard;
//# sourceMappingURL=projectGuard.js.map