"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDeploymentWorkflowInstallCommand = void 0;
const loadConfiguration_1 = require("../../../utils/configuration/loadConfiguration");
const confirmInstallCommandPrompt_1 = require("../prompts/confirmInstallCommandPrompt");
const confirmUserWantsInstallCommandPrompt_1 = require("../prompts/confirmUserWantsInstallCommandPrompt");
const confirmUserWantsToSpecifyInstallCommandPrompt_1 = require("../prompts/confirmUserWantsToSpecifyInstallCommandPrompt");
const enterInstallCommandPrompt_1 = require("../prompts/enterInstallCommandPrompt");
const deriveInstallCommandFromLockfile_1 = require("./deriveInstallCommandFromLockfile");
const requestDeploymentWorkflowInstallCommand = async () => {
    const config = await (0, loadConfiguration_1.loadConfiguration)({}).catch(() => null);
    if (config === null || !config.sites[0]?.buildCommand) {
        return;
    }
    const wantsInstallCommand = await (0, confirmUserWantsInstallCommandPrompt_1.confirmUserWantsInstallCommandPrompt)();
    if (!wantsInstallCommand) {
        return;
    }
    const wantsToSpecifyCommand = await (0, confirmUserWantsToSpecifyInstallCommandPrompt_1.confirmUserWantsToSpecifyInstallCommandPrompt)();
    if (wantsToSpecifyCommand) {
        return (0, enterInstallCommandPrompt_1.enterInstallCommandPrompt)();
    }
    const installCommand = await (0, deriveInstallCommandFromLockfile_1.deriveInstallCommandFromLockfile)();
    if (!installCommand ||
        !(await (0, confirmInstallCommandPrompt_1.confirmInstallCommandPrompt)({ installCommand }))) {
        return (0, enterInstallCommandPrompt_1.enterInstallCommandPrompt)();
    }
    return installCommand;
};
exports.requestDeploymentWorkflowInstallCommand = requestDeploymentWorkflowInstallCommand;
//# sourceMappingURL=requestDeploymentWorkflowInstallCommand.js.map