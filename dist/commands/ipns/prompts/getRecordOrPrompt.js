"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getRecordOrPrompt = async ({ sdk, name, }) => {
    if (name) {
        return await sdk.ipns().getRecord({ name });
    }
    const records = await sdk.ipns().listRecords();
    if (records.length === 0) {
        throw new errors_1.IpnsRecordsNotFoundError();
    }
    const ipnsRecordId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('ipnsSelectRecord')}:`,
        choices: records.map((record) => ({
            title: record.name,
            value: record.id,
        })),
    });
    const ipnsRecordMatch = records.find((record) => record.id === ipnsRecordId);
    if (!ipnsRecordMatch)
        return;
    return ipnsRecordMatch;
};
exports.getRecordOrPrompt = getRecordOrPrompt;
//# sourceMappingURL=getRecordOrPrompt.js.map