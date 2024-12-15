"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translation_1 = require("../../utils/translation");
const create_1 = require("./create");
const delete_1 = require("./delete");
const detail_1 = require("./detail");
const list_1 = require("./list");
const verify_1 = require("./verify");
exports.default = (program) => {
    const cmd = program.command('domains').description((0, translation_1.t)('domainsDesc'));
    cmd
        .command('list')
        .option('--siteId <string>', (0, translation_1.t)('siteIDDomainAssignTo'))
        .description((0, translation_1.t)('listAllDomainsSelectProject'))
        .action((options) => (0, list_1.listDomainsActionHandler)(options));
    cmd
        .command('detail')
        .option('--id <string>', (0, translation_1.t)('idOfDomainForDetails'))
        .option('--hostname <string>', (0, translation_1.t)('hostnameOfDomainForDetails'))
        .description((0, translation_1.t)('showDomainDetails'))
        .action((options) => (0, detail_1.detailDomainActionHandler)(options));
    cmd
        .command('create')
        .option('--privateGatewayId <string>', (0, translation_1.t)('idOfPvtGwToCreateDomainFor'))
        .option('--privateGatewaySlug <string>', (0, translation_1.t)('slugOfPvtGwToCreateDomainFor'))
        .option('--siteId <string>', (0, translation_1.t)('siteIdToCreateDomainFor'))
        .option('--siteSlug <string>', (0, translation_1.t)('slugCreateDomainFor'))
        .option('--hostname <string>', (0, translation_1.t)('hostnameCreateDomainFor'))
        .description((0, translation_1.t)('createDomainForSiteOrGw'))
        .action((options) => (0, create_1.createDomainActionHandler)(options));
    cmd
        .command('delete')
        .option('--id <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('id'),
        subject: (0, translation_1.t)('domain'),
        action: (0, translation_1.t)('delete'),
    }))
        .option('--hostname <string>', (0, translation_1.t)('commonNameOfSubjectToAction', {
        name: (0, translation_1.t)('hostname'),
        subject: (0, translation_1.t)('ens'),
        action: (0, translation_1.t)('delete'),
    }))
        .description((0, translation_1.t)('deleteDomain'))
        .action((options) => (0, delete_1.deleteDomainActionHandler)(options));
    cmd
        .command('verify')
        .option('--id <string>', (0, translation_1.t)('verifyDomainById'))
        .option('--hostname <string>', (0, translation_1.t)('verifyDomainByHostname'))
        .description((0, translation_1.t)('verifyDomainConfig'))
        .action((options) => (0, verify_1.verifyDomainActionHandler)(options));
    return cmd;
};
//# sourceMappingURL=index.js.map