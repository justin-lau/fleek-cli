"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDomainActionHandler = exports.deleteDomainAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getDomainOrPrompt_1 = require("./prompts/getDomainOrPrompt");
const waitUntilDomainDeleted_1 = require("./wait/waitUntilDomainDeleted");
const deleteDomainAction = async ({ sdk, args }) => {
    const domain = await (0, getDomainOrPrompt_1.getDomainOrPrompt)({
        id: args.id,
        hostname: args.hostname,
        sdk,
    });
    if (!domain) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'domain' }));
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('deletingDomain'));
    await sdk.domains().deleteDomain({ domainId: domain.id });
    const isDeleted = await (0, waitUntilDomainDeleted_1.waitUntilDomainDeleted)({ sdk, domain });
    if (!isDeleted) {
        cli_1.output.error((0, translation_1.t)('cannotDeleteDomain', { hostname: domain.hostname }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: `${(0, translation_1.t)('domain')} "${domain.hostname}"`,
        action: 'deleted',
    }));
    cli_1.output.printNewLine();
};
exports.deleteDomainAction = deleteDomainAction;
exports.deleteDomainActionHandler = (0, withGuards_1.withGuards)(exports.deleteDomainAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map