"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateGatewayOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getPrivateGatewayOrPrompt = async ({ id, slug, sdk, }) => {
    if (id) {
        return sdk.privateGateways().get({ id });
    }
    if (slug) {
        return sdk.privateGateways().getBySlug({ slug });
    }
    const privateGateways = await sdk.privateGateways().list();
    if (privateGateways.length === 0) {
        throw new errors_1.PrivateGatewaysNotFoundError({});
    }
    const selectedPrivateGatewayId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('commonSelectXFromList', { subject: (0, translation_1.t)('privateGateway') })}:`,
        choices: privateGateways.map((privateGateway) => ({
            title: `${privateGateway.name} (${privateGateway.slug})`,
            value: privateGateway.id,
        })),
    });
    const matchPrivateGw = privateGateways.find((privateGateway) => privateGateway.id === selectedPrivateGatewayId);
    if (!matchPrivateGw)
        return;
    return matchPrivateGw;
};
exports.getPrivateGatewayOrPrompt = getPrivateGatewayOrPrompt;
//# sourceMappingURL=getPrivateGatewayOrPrompt.js.map