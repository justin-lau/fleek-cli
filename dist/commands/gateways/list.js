"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPrivateGatewaysActionHandler = exports.listPrivateGatewaysAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const listPrivateGatewaysAction = async ({ sdk }) => {
    const privateGateways = await sdk.privateGateways().list();
    if (privateGateways.length === 0) {
        cli_1.output.log((0, translation_1.t)('noPrivateGateways'));
        return;
    }
    cli_1.output.table(privateGateways.map(({ id, slug, name, createdAt }) => ({
        ID: id,
        Slug: slug,
        Name: name,
        'Created At': createdAt,
    })));
};
exports.listPrivateGatewaysAction = listPrivateGatewaysAction;
exports.listPrivateGatewaysActionHandler = (0, withGuards_1.withGuards)(exports.listPrivateGatewaysAction, {
    scopes: { authenticated: true, project: true, site: false },
});
//# sourceMappingURL=list.js.map