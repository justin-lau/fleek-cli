"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteEnsRecords = void 0;
const getSiteEnsRecords = async ({ sdk, ...args }) => {
    const site = await sdk.sites().get({ id: args.site.id });
    const ensRecordsGroupedByIpns = await Promise.all(site.ipnsRecords.map((ipnsRecord) => sdk.ens().listByIpnsRecordId({ ipnsRecordId: ipnsRecord.id })));
    return ensRecordsGroupedByIpns.flat();
};
exports.getSiteEnsRecords = getSiteEnsRecords;
//# sourceMappingURL=getSiteEnsRecords.js.map