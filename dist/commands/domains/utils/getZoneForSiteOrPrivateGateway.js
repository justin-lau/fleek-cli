"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZoneForSiteOrPrivateGateway = void 0;
const waitForZoneCreationResult_1 = require("../wait/waitForZoneCreationResult");
const getZoneForSiteOrPrivateGateway = async (args) => {
    if ('privateGateway' in args) {
        const { privateGateway: { zone }, } = args;
        if (!zone)
            return null;
        return zone;
    }
    const existingZones = args.site.zones?.filter((zone) => zone.status === 'CREATED');
    if (existingZones?.[0]?.id) {
        return existingZones[0];
    }
    const zone = await args.sdk
        .domains()
        .createZoneForSite({ siteId: args.site.id });
    const zoneCreationResult = await (0, waitForZoneCreationResult_1.waitForZoneCreationResult)({
        sdk: args.sdk,
        zone,
    });
    if (zoneCreationResult !== 'CREATED') {
        return null;
    }
    return zone;
};
exports.getZoneForSiteOrPrivateGateway = getZoneForSiteOrPrivateGateway;
//# sourceMappingURL=getZoneForSiteOrPrivateGateway.js.map