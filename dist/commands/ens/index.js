"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const detail_1 = require("./detail");
const list_1 = require("./list");
const verify_1 = require("./verify");
exports.default = (program) => {
    const cmd = program.command('ens').description((0, translation_1.t)('ensCmdDescription'));
    cmd
        .command('create')
        .option('--siteId <string>', (0, translation_1.t)('siteIdOf'))
        .option('--siteSlug <string>', (0, translation_1.t)('siteSlugOf'))
        .option('--name <string>', (0, translation_1.t)('ensCreateName'))
        .option('--ipnsName <string>', (0, translation_1.t)('ensIPNSNameToLink'))
        .description((0, translation_1.t)('ensCreateRecord'))
        .action((options) => (0, create_1.createEnsActionHandler)(options));
    cmd
        .command('detail')
        .option('--id <string>', (0, translation_1.t)('nameOfSubjectForDetails', { name: (0, translation_1.t)('id'), subject: (0, translation_1.t)('ens') }))
        .option('--name <string>', (0, translation_1.t)('nameOfSubjectForDetails', { name: (0, translation_1.t)('name'), subject: (0, translation_1.t)('ens') }))
        .description((0, translation_1.t)('ensShowDetails'))
        .action((options) => (0, detail_1.detailEnsRecordsActionHandler)(options));
    cmd
        .command('list')
        .option('--siteId <string>', (0, translation_1.t)('siteIdOf'))
        .description((0, translation_1.t)('ensListAllForProject'))
        .action((options) => (0, list_1.listEnsRecordsActionHandler)(options));
    cmd
        .command('delete')
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('ens'),
        action: (0, translation_1.t)('delete'),
    }))
        .option('--name <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('name'),
        subject: (0, translation_1.t)('ens'),
        action: (0, translation_1.t)('delete'),
    }))
        .description((0, translation_1.t)('ensDelete'))
        .action((options) => (0, delete_1.deleteEnsActionHandler)(options));
    cmd
        .command('verify')
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('ens'),
        action: (0, translation_1.t)('verify'),
    }))
        .option('--name <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('name'),
        subject: (0, translation_1.t)('ens'),
        action: (0, translation_1.t)('verify'),
    }))
        .description((0, translation_1.t)('ensVerifyIsConfig'))
        .action((options) => (0, verify_1.verifyEnsRecordActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map