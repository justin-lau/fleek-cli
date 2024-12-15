"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDomainsActionHandler = exports.listDomainsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getSiteDomains_1 = require("./utils/getSiteDomains");
const listDomainsAction = async ({ sdk, args }) => {
    const domains = args.siteId
        ? await (0, getSiteDomains_1.getSiteDomains)({ siteId: args.siteId, sdk })
        : await sdk.domains().list();
    if (domains.length === 0) {
        cli_1.output.mistake((0, translation_1.t)('noDomainsAssocFound'));
        return;
    }
    cli_1.output.table(domains.map(({ hostname, createdAt, status }) => ({
        Hostname: hostname,
        'Created At': createdAt,
        Status: status,
    })));
};
exports.listDomainsAction = listDomainsAction;
exports.listDomainsActionHandler = (0, withGuards_1.withGuards)(exports.listDomainsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map