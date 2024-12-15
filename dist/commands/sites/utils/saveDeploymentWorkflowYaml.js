"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDeploymentWorkflowYaml = void 0;
const node_fs_1 = require("node:fs");
const chalk_1 = __importDefault(require("chalk"));
const translation_1 = require("../../../utils/translation");
const saveDeploymentWorkflowYaml = async ({ yamlContent, yamlPath, personalAccessToken, projectId, output, }) => {
    try {
        await node_fs_1.promises.writeFile(yamlPath, yamlContent);
        output.printNewLine();
        output.success((0, translation_1.t)('githubActionWrkflSavedTo', {
            path: chalk_1.default.underline(chalk_1.default.cyan(yamlPath)),
        }));
        output.printNewLine();
        output.chore(`${(0, translation_1.t)('setSecretsInGithugRepoSettings')}:`);
        output.table([
            {
                Name: 'FLEEK_TOKEN',
                Value: personalAccessToken,
            },
            {
                Name: 'FLEEK_PROJECT_ID',
                Value: projectId,
            },
        ]);
        output.printNewLine();
    }
    catch (e) {
        output.error((0, translation_1.t)('failSaveGenYaml', { yamlPath }));
    }
};
exports.saveDeploymentWorkflowYaml = saveDeploymentWorkflowYaml;
//# sourceMappingURL=saveDeploymentWorkflowYaml.js.map