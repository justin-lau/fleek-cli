"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrivateGatewayActionHandler = exports.deletePrivateGatewayAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getPrivateGatewayOrPrompt_1 = require("./prompts/getPrivateGatewayOrPrompt");
const deletePrivateGatewayAction = async ({ sdk, args }) => {
    const privateGateway = await (0, getPrivateGatewayOrPrompt_1.getPrivateGatewayOrPrompt)({
        sdk,
        id: args.id,
        slug: args.slug,
    });
    if (!privateGateway) {
        cli_1.output.error((0, translation_1.t)('noPrivateGatewaysFoundUnexpectedly'));
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('deletingGateway'));
    await sdk.privateGateways().delete({ id: privateGateway.id });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: `${(0, translation_1.t)('privateGateway')} "${privateGateway.name}"`,
        action: (0, translation_1.t)('deleted'),
    }));
};
exports.deletePrivateGatewayAction = deletePrivateGatewayAction;
exports.deletePrivateGatewayActionHandler = (0, withGuards_1.withGuards)(exports.deletePrivateGatewayAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=delete.js.map