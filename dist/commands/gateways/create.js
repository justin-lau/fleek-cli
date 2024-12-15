"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrivateGatewayActionHandler = exports.createPrivateGatewayAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const create_1 = require("../domains/create");
const waitForZoneCreationResult_1 = require("../domains/wait/waitForZoneCreationResult");
const getPrivateGatewayNameOrPrompt_1 = require("./prompts/getPrivateGatewayNameOrPrompt");
const createPrivateGatewayAction = async ({ sdk, args }) => {
    const name = await (0, getPrivateGatewayNameOrPrompt_1.getPrivateGatewayNameOrPrompt)({ name: args.name });
    cli_1.output.spinner(`${(0, translation_1.t)('creatingNewGateway')}...`);
    const zone = await sdk.domains().createZoneForPrivateGateway();
    const zoneCreationResult = await (0, waitForZoneCreationResult_1.waitForZoneCreationResult)({ sdk, zone });
    if (zoneCreationResult !== 'CREATED') {
        cli_1.output.error((0, translation_1.t)('gatewayNotCreated'));
        cli_1.output.printNewLine();
        return;
    }
    const privateGateway = await sdk
        .privateGateways()
        .create({ name, zoneId: zone.id });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonNameCreateSuccess', { name: `${(0, translation_1.t)('privateGateway')} "${name}"` }));
    cli_1.output.printNewLine();
    await (0, create_1.createDomainAction)({
        sdk,
        args: { privateGatewayId: privateGateway.id },
    });
};
exports.createPrivateGatewayAction = createPrivateGatewayAction;
exports.createPrivateGatewayActionHandler = (0, withGuards_1.withGuards)(exports.createPrivateGatewayAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=create.js.map