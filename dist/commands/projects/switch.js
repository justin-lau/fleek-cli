"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchProjectActionHandler = exports.switchProjectAction = void 0;
const cli_1 = require("../../cli");
const config_1 = require("../../config");
const sdkGuard_1 = require("../../guards/sdkGuard");
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const getProjectOrPrompt_1 = require("./prompts/getProjectOrPrompt");
const switchProjectAction = async ({ sdk, args }) => {
    const project = await (0, getProjectOrPrompt_1.getProjectOrPrompt)({ sdk, id: args.id }).catch(() => null);
    if (project === null) {
        cli_1.output.log((0, translation_1.t)('projectsSwitchNeedCreateFirst'));
        await (0, create_1.createProjectActionHandler)();
        return;
    }
    if (!project) {
        cli_1.output.log((0, translation_1.t)('noProjectIdFoundUnexpectedly'));
        return;
    }
    config_1.config.projectId.set(project.id);
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('projectsSwitchSuccess', { name: project.name }));
    cli_1.output.printNewLine();
};
exports.switchProjectAction = switchProjectAction;
exports.switchProjectActionHandler = (0, sdkGuard_1.sdkGuard)(exports.switchProjectAction);
//# sourceMappingURL=switch.js.map