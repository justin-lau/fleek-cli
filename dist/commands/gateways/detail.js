"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailPrivateGatewayActionHandler = exports.detailPrivateGatewayAction = void 0;
const utils_ipfs_1 = require("@fleek-platform/utils-ipfs");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getPrivateGatewayOrPrompt_1 = require("./prompts/getPrivateGatewayOrPrompt");
const detailPrivateGatewayAction = async ({ args, sdk }) => {
    const privateGateway = await (0, getPrivateGatewayOrPrompt_1.getPrivateGatewayOrPrompt)({
        sdk,
        id: args.id,
        slug: args.slug,
    });
    if (!privateGateway) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'private gateway' }));
        return;
    }
    cli_1.output.table([
        {
            ID: privateGateway.id,
            Slug: privateGateway.slug,
            Name: privateGateway.name,
            'Created At': privateGateway.createdAt,
        },
    ]);
    const zoneId = privateGateway.zone?.id;
    const domains = zoneId ? await sdk.domains().listByZoneId({ zoneId }) : [];
    if (domains.length === 0) {
        cli_1.output.log((0, translation_1.t)('gatewayNoDomainsAss'));
        return;
    }
    cli_1.output.log(`${(0, translation_1.t)('acccessContentViaDomain')}:`);
    for (const domain of domains) {
        cli_1.output.link((0, utils_ipfs_1.getPrivateIpfsGatewayUrl)({ hostname: domain.hostname, hash: '<cid>' }));
    }
    cli_1.output.printNewLine();
};
exports.detailPrivateGatewayAction = detailPrivateGatewayAction;
exports.detailPrivateGatewayActionHandler = (0, withGuards_1.withGuards)(exports.detailPrivateGatewayAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=detail.js.map