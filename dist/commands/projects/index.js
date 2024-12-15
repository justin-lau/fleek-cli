"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const list_1 = require("./list");
const switch_1 = require("./switch");
exports.default = (program) => {
    const cmd = program.command('projects').description((0, translation_1.t)('projectsDescription'));
    cmd
        .command('list')
        .description((0, translation_1.t)('projectsListDesc'))
        .action(() => (0, list_1.listProjectsActionHandler)());
    cmd
        .command('switch')
        .option('--id <string>', (0, translation_1.t)('projectsSwitchOptId'))
        .description((0, translation_1.t)('projectsSwitchBetween'))
        .action((options) => (0, switch_1.switchProjectActionHandler)(options));
    cmd
        .command('create')
        .option('--name <string>', (0, translation_1.t)('projectsWhatNameOfProject'))
        .description((0, translation_1.t)('projectsCreateNewDesc'))
        .action((options) => (0, create_1.createProjectActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map