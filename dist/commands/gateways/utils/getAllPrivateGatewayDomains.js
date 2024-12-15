"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActivePrivateGatewayDomains = exports.getAllPrivateGatewayDomains = void 0;
const getAllPrivateGatewayDomains = async ({ sdk, filter, }) => {
    const privateGateways = await sdk.privateGateways().list();
    if (privateGateways.length === 0) {
        return [];
    }
    const domainPromises = privateGateways.map(async (privateGateway) => {
        const zoneId = privateGateway.zone?.id;
        if (!zoneId)
            return [];
        return sdk.domains().listByZoneId({ zoneId });
    });
    const domains = (await Promise.all(domainPromises)).flat();
    return filter && Object.keys(filter).length > 0
        ? domains.filter((domain) => Object.entries(filter).every(([key, value]) => {
            return domain[key] === value;
        }))
        : domains;
};
exports.getAllPrivateGatewayDomains = getAllPrivateGatewayDomains;
const getAllActivePrivateGatewayDomains = async ({ sdk, }) => {
    return await (0, exports.getAllPrivateGatewayDomains)({
        sdk,
        filter: { status: 'ACTIVE' },
    });
};
exports.getAllActivePrivateGatewayDomains = getAllActivePrivateGatewayDomains;
//# sourceMappingURL=getAllPrivateGatewayDomains.js.map