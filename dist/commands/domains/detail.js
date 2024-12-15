"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailDomainActionHandler = exports.detailDomainAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getDomainOrPrompt_1 = require("./prompts/getDomainOrPrompt");
const domainCreationPending = ['CREATING', 'VERIFYING'];
const domainCreationFailed = [
    'CREATING_FAILED',
    'VERIFYING_FAILED',
];
const detailDomainAction = async ({ sdk, args }) => {
    const domain = await (0, getDomainOrPrompt_1.getDomainOrPrompt)({
        id: args.id,
        hostname: args.hostname,
        sdk,
    });
    if (!domain) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'domain' }));
        return;
    }
    if (domainCreationPending.includes(domain.status)) {
        cli_1.output.printNewLine();
        cli_1.output.warn((0, translation_1.t)('domainCreationPending'));
        return;
    }
    if (domainCreationFailed.includes(domain.status)) {
        cli_1.output.printNewLine();
        cli_1.output.error((0, translation_1.t)('domainCreationFailed'));
        return;
    }
    cli_1.output.table([
        {
            Hostname: domain.hostname,
            'Created At': domain.createdAt,
            Status: domain.status,
        },
    ]);
    cli_1.output.log(`${(0, translation_1.t)('configDomainAsTable')}:`);
    cli_1.output.table(domain.dnsConfigs.map((domain) => ({
        Type: domain.type,
        Name: domain.name,
        Value: domain.value,
    })));
};
exports.detailDomainAction = detailDomainAction;
exports.detailDomainActionHandler = (0, withGuards_1.withGuards)(exports.detailDomainAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=detail.js.map