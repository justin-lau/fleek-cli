"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteDomains = void 0;
// TODO: [graphql] Add field to site with list of domains and replace in CLI #682
const getSiteDomains = async ({ sdk, siteId, }) => {
    const site = await sdk.sites().get({ id: siteId });
    const domainsGroupedByZones = await Promise.all(site.zones.map((zone) => sdk.domains().listByZoneId({ zoneId: zone.id })));
    return domainsGroupedByZones.flat();
};
exports.getSiteDomains = getSiteDomains;
//# sourceMappingURL=getSiteDomains.js.map