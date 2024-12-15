"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeploymentWorkflowYamlLocation = void 0;
const node_path_1 = require("node:path");
const translation_1 = require("../../../utils/translation");
const confirmWorkflowCustomPathPrompt_1 = require("../prompts/confirmWorkflowCustomPathPrompt");
const enterDirectoryPathPrompt_1 = require("../prompts/enterDirectoryPathPrompt");
const prepareGitHubActionsIntegration_1 = require("./prepareGitHubActionsIntegration");
const getDeploymentWorkflowYamlLocation = async () => {
    const useCustomLocation = await (0, confirmWorkflowCustomPathPrompt_1.confirmWorkflowCustomPathPrompt)({
        path: prepareGitHubActionsIntegration_1.ghActionsDeploySitesYamlPath,
    });
    if (useCustomLocation === false) {
        return prepareGitHubActionsIntegration_1.ghActionsDeploySitesYamlPath;
    }
    const directory = await (0, enterDirectoryPathPrompt_1.enterDirectoryPathPrompt)({
        message: (0, translation_1.t)('specifyDirToSaveWorkConf'),
    });
    const yamlPath = (0, node_path_1.join)(directory, prepareGitHubActionsIntegration_1.ghWorkflowFilename);
    return yamlPath;
};
exports.getDeploymentWorkflowYamlLocation = getDeploymentWorkflowYamlLocation;
//# sourceMappingURL=getDeploymentWorkflowYamlLocation.js.map