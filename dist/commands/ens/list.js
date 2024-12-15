"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEnsRecordsActionHandler = exports.listEnsRecordsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getSiteEnsRecords_1 = require("./utils/getSiteEnsRecords");
const listEnsRecordsAction = async ({ sdk, args }) => {
    const ensRecords = args.siteId
        ? await (0, getSiteEnsRecords_1.getSiteEnsRecords)({ site: { id: args.siteId }, sdk })
        : await sdk.ens().list();
    if (ensRecords.length === 0) {
        cli_1.output.log((0, translation_1.t)('noENSNames'));
        return;
    }
    cli_1.output.table(ensRecords.map(({ name, createdAt, status }) => ({
        ENS: name,
        Status: status,
        'Created At': createdAt,
    })));
};
exports.listEnsRecordsAction = listEnsRecordsAction;
exports.listEnsRecordsActionHandler = (0, withGuards_1.withGuards)(exports.listEnsRecordsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map