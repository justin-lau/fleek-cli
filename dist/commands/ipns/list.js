"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const listAction = async ({ sdk }) => {
    const records = await sdk.ipns().listRecords();
    if (records.length > 0) {
        return cli_1.output.table(records.map((record) => ({
            Name: record.name,
            CID: record.hash,
            ID: record.id,
        })));
    }
    return cli_1.output.log((0, translation_1.t)('recordsNotFound'));
};
exports.listActionHandler = (0, withGuards_1.withGuards)(listAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map