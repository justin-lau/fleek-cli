"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getProjectOrPrompt = async ({ sdk, id, }) => {
    if (id) {
        return await sdk.projects().get({ id });
    }
    const projects = await sdk.projects().list();
    if (projects.length === 0) {
        throw new errors_1.ProjectsNotFoundError();
    }
    const projectId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('commonSelectXFromList', { subject: (0, translation_1.t)('aProject') })}:`,
        choices: projects.map((project) => ({
            title: project.name,
            value: project.id,
        })),
    });
    const matchProject = projects.find((project) => project.id === projectId);
    if (!matchProject)
        return;
    return matchProject;
};
exports.getProjectOrPrompt = getProjectOrPrompt;
//# sourceMappingURL=getProjectOrPrompt.js.map