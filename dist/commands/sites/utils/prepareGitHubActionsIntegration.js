"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareGitHubActionsIntegration = exports.ghActionsDeploySitesYamlPath = exports.ghActionsWorflowsDirectory = exports.ghWorkflowFilename = void 0;
const node_path_1 = require("node:path");
const utils_github_1 = require("@fleek-platform/utils-github");
const semver_1 = require("semver");
const fs_1 = require("../../../utils/fs");
const confirmFileOverridePrompt_1 = require("../prompts/confirmFileOverridePrompt");
const getDeploymentWorkflowYamlLocation_1 = require("./getDeploymentWorkflowYamlLocation");
const initializeDeploymentWorkflowDirectory_1 = require("./initializeDeploymentWorkflowDirectory");
const requestDeploymentWorkflowInstallCommand_1 = require("./requestDeploymentWorkflowInstallCommand");
const saveDeploymentWorkflowYaml_1 = require("./saveDeploymentWorkflowYaml");
const json_1 = require("../../../utils/json");
exports.ghWorkflowFilename = 'fleek-deploy.yaml';
exports.ghActionsWorflowsDirectory = (0, node_path_1.join)(process.cwd(), '.github/workflows');
exports.ghActionsDeploySitesYamlPath = (0, node_path_1.join)(exports.ghActionsWorflowsDirectory, exports.ghWorkflowFilename);
const prepareGitHubActionsIntegration = async ({ personalAccessToken, projectId, fleekConfigPath, output, }) => {
    let nodeVersion;
    try {
        const nodeSemver = (0, json_1.loadJSONFromPackageRoot)('package.json').engines.node.replace(/[^0-9\.]+/, '');
        nodeVersion = (0, semver_1.parse)(nodeSemver)?.major ?? 18;
    }
    catch {
        nodeVersion = 18;
    }
    const installCommand = await (0, requestDeploymentWorkflowInstallCommand_1.requestDeploymentWorkflowInstallCommand)();
    const yamlContent = (0, utils_github_1.generateDeploymentWorkflowYaml)({
        nodeVersion,
        fleekConfigPath,
        installCommand,
    });
    const yamlPath = await (0, getDeploymentWorkflowYamlLocation_1.getDeploymentWorkflowYamlLocation)();
    const pathExists = await (0, fs_1.fileExists)(yamlPath);
    if (pathExists && !(await (0, confirmFileOverridePrompt_1.confirmFileOverridePrompt)({ path: yamlPath }))) {
        return;
    }
    if (yamlPath === exports.ghActionsDeploySitesYamlPath) {
        await (0, initializeDeploymentWorkflowDirectory_1.initializeDeploymentWorkflowDirectory)({
            output,
            ghActionsWorflowsDirectory: exports.ghActionsWorflowsDirectory,
        });
    }
    await (0, saveDeploymentWorkflowYaml_1.saveDeploymentWorkflowYaml)({
        yamlPath,
        yamlContent,
        personalAccessToken,
        projectId,
        output,
    });
};
exports.prepareGitHubActionsIntegration = prepareGitHubActionsIntegration;
//# sourceMappingURL=prepareGitHubActionsIntegration.js.map