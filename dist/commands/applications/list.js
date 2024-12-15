"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listApplicationsActionHandler = exports.listApplicationsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const parser_1 = require("./utils/parser");
const truncateAndJoinStrings_1 = require("./utils/truncateAndJoinStrings");
const listApplicationsAction = async ({ sdk }) => {
    const applications = await sdk.applications().list();
    if (applications.length === 0) {
        cli_1.output.log((0, translation_1.t)('noYYet', { name: `${(0, translation_1.t)('sdkPoweredApp')} ${(0, translation_1.t)('clientId')}` }));
        return;
    }
    cli_1.output.table(applications.map(({ id, name, clientId, whitelistDomains, whiteLabelDomains, createdAt, }) => {
        // Warning: The WhiteLableDomains is deprecated
        // the parser here combines the new field with old
        // to avoid missing any state provoked by data pushed
        // by old clients e.g. cli 0.7.3
        const uniqueWhitelistDomains = (0, parser_1.parseWhitelistDomains)({
            whiteLabelDomains,
            whitelistDomains,
        });
        return {
            ID: id,
            Name: name,
            'Client ID': clientId,
            'White list domains': (0, truncateAndJoinStrings_1.truncateAndJoinStrings)({
                input: uniqueWhitelistDomains.map((whitelistDomain) => whitelistDomain.hostname),
                truncateOnPosition: 3,
            }),
            'Created At': createdAt,
        };
    }));
};
exports.listApplicationsAction = listApplicationsAction;
exports.listApplicationsActionHandler = (0, withGuards_1.withGuards)(exports.listApplicationsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map