"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const list_1 = require("./list");
const publish_1 = require("./publish");
const resolve_1 = require("./resolve");
exports.default = (program) => {
    const cmd = program.command('ipns').description((0, translation_1.t)('ipnsDescription'));
    cmd
        .command('create')
        .description((0, translation_1.t)('ipnsCreateDescription'))
        .option('--siteSlug <string>', (0, translation_1.t)('commonIdentifierXAssignedToSubjectY', {
        name: 'humanReadableSlugDesc',
        subject: (0, translation_1.t)('ipnsRecord'),
    }))
        .option('--siteId <string>', (0, translation_1.t)('commonIdentifierXAssignedToSubjectY', {
        name: (0, translation_1.t)('uniqueIdentifier'),
        subject: (0, translation_1.t)('ipnsRecord'),
    }))
        .action((options) => (0, create_1.createActionHandler)(options));
    cmd
        .command('publish')
        .description((0, translation_1.t)('ipnsPublishDescription'))
        .option('--name <string>', (0, translation_1.t)('ipnsPublishOptionNameDesc'))
        .option('--hash <string>', (0, translation_1.t)('ipnsPublishOptionHashDesc'))
        .action((options) => (0, publish_1.publishActionHandler)(options));
    cmd
        .command('list')
        .description((0, translation_1.t)('ipnsListDescription'))
        .action(() => (0, list_1.listActionHandler)());
    cmd
        .command('delete')
        .description((0, translation_1.t)('ipnsDeleteDescription'))
        .option('--name <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('name'),
        subject: (0, translation_1.t)('ipnsRecord'),
        action: (0, translation_1.t)('delete'),
    }))
        .action((options) => (0, delete_1.deleteActionHandler)(options));
    cmd
        .command('resolve')
        .description((0, translation_1.t)('ipnsResolveDescription'))
        .argument('<name>', (0, translation_1.t)('ipnsResolveArgName'))
        .action((name) => (0, resolve_1.resolveActionHandler)({ name }));
    return cmd;
};
//# sourceMappingURL=index.js.map