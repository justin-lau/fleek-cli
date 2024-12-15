"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const list_1 = require("./list");
const update_1 = require("./update");
exports.default = (program) => {
    const cmd = program
        .command('applications')
        .description((0, translation_1.t)('appCmdDescription'));
    cmd
        .command('list')
        .description((0, translation_1.t)('listAllAppForProject'))
        .action(list_1.listApplicationsActionHandler);
    cmd
        .command('create')
        .option('--name <string>')
        .option('--whitelistDomains <string...>', (0, translation_1.t)('whitelistDomainsSepBySp'))
        .description((0, translation_1.t)('createNewAppClient'))
        .action((options) => (0, create_1.createApplicationActionHandler)(options));
    cmd
        .command('update')
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('clientId'),
        subject: (0, translation_1.t)('sdkPoweredApp'),
        action: (0, translation_1.t)('update'),
    }))
        .option('--name <string>', (0, translation_1.t)('newNameOfAppClient'))
        .option('--whitelistDomains <string...>', (0, translation_1.t)('whitelistDomainsSepBySp'))
        .description((0, translation_1.t)('updateAppClient'))
        .action((options) => (0, update_1.updateApplicationActionHandler)(options));
    cmd
        .command('delete')
        .description((0, translation_1.t)('deleteAppClient'))
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('clientId'),
        subject: (0, translation_1.t)('sdkPoweredApp'),
        action: (0, translation_1.t)('delete'),
    }))
        .action((options) => (0, delete_1.deleteApplicationActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map