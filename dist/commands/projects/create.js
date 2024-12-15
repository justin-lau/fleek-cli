"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectActionHandler = exports.createProjectAction = void 0;
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const sdkGuard_1 = require("../../guards/sdkGuard");
const translation_1 = require("../../utils/translation");
const getProjectNameOrPrompt_1 = require("./prompts/getProjectNameOrPrompt");
const createProjectAction = async ({ sdk, args }) => {
    const name = await (0, getProjectNameOrPrompt_1.getProjectNameOrPrompt)({ name: args.name });
    cli_1.output.spinner(`${(0, translation_1.t)('projectCreating')}...`);
    const response = await sdk.projects().create({ name });
    config_1.config.projectId.set(response.id);
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('projectCreatedAndSwitched', { name, projectId: response.id }));
    cli_1.output.printNewLine();
};
exports.createProjectAction = createProjectAction;
exports.createProjectActionHandler = (0, sdkGuard_1.sdkGuard)(exports.createProjectAction);
//# sourceMappingURL=create.js.map