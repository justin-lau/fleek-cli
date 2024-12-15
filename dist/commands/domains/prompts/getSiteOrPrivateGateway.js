"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteOrPrivateGateway = void 0;
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getPrivateGatewayOrPrompt_1 = require("../../gateways/prompts/getPrivateGatewayOrPrompt");
const getSiteOrPrompt_1 = require("../../sites/prompts/getSiteOrPrompt");
const getSiteOrPrivateGateway = async ({ sdk, privateGatewayId, privateGatewaySlug, siteId, siteSlug, }) => {
    const { upperFirst } = await import('lodash-es');
    const zoneType = !privateGatewayId && !privateGatewaySlug && !siteId && !siteSlug
        ? await (0, selectPrompt_1.selectPrompt)({
            message: `${(0, translation_1.t)('selectDomainPurpose')}:`,
            choices: [
                { title: upperFirst((0, translation_1.t)('site')), value: 'SITE' },
                { title: (0, translation_1.t)('privateGateway'), value: 'PRIVATE_GATEWAY' },
            ],
        })
        : null;
    if (privateGatewayId ||
        privateGatewaySlug ||
        zoneType === 'PRIVATE_GATEWAY') {
        const privateGateway = await (0, getPrivateGatewayOrPrompt_1.getPrivateGatewayOrPrompt)({
            id: privateGatewayId,
            slug: privateGatewaySlug,
            sdk,
        });
        return { privateGateway };
    }
    const site = await (0, getSiteOrPrompt_1.getSiteOrPrompt)({ id: siteId, slug: siteSlug, sdk });
    return { site };
};
exports.getSiteOrPrivateGateway = getSiteOrPrivateGateway;
//# sourceMappingURL=getSiteOrPrivateGateway.js.map