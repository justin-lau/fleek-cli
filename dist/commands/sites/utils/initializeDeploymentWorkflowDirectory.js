"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDeploymentWorkflowDirectory = void 0;
const node_fs_1 = require("node:fs");
const translation_1 = require("../../../utils/translation");
const directoryExists_1 = require("./directoryExists");
const initializeDeploymentWorkflowDirectory = async ({ output, ghActionsWorflowsDirectory, }) => {
    const exists = await (0, directoryExists_1.directoryExists)(ghActionsWorflowsDirectory);
    if (exists) {
        return;
    }
    output.warn((0, translation_1.t)('cantFindGithubWorkfl'));
    output.warn((0, translation_1.t)('creatingGithubWorkflDir'));
    await node_fs_1.promises.mkdir(ghActionsWorflowsDirectory, { recursive: true });
};
exports.initializeDeploymentWorkflowDirectory = initializeDeploymentWorkflowDirectory;
//# sourceMappingURL=initializeDeploymentWorkflowDirectory.js.map