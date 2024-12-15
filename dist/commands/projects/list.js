"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProjectsActionHandler = exports.listProjectsAction = void 0;
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const sdkGuard_1 = require("../../guards/sdkGuard");
const Output_1 = require("../../output/Output");
const translation_1 = require("../../utils/translation");
const listProjectsAction = async ({ sdk }) => {
    const projects = await sdk.projects().list();
    if (projects.length === 0) {
        cli_1.output.log((0, translation_1.t)('noYYet', { name: (0, translation_1.t)('projects') }));
        return;
    }
    const currentProjectId = config_1.config.projectId.get();
    cli_1.output.table(projects.map(({ id, name, createdAt }) => ({
        ID: id,
        Name: name,
        'Created At': createdAt,
        Current: currentProjectId === id ? Output_1.Icons.Checkmark : '',
    })));
};
exports.listProjectsAction = listProjectsAction;
exports.listProjectsActionHandler = (0, sdkGuard_1.sdkGuard)(exports.listProjectsAction);
//# sourceMappingURL=list.js.map