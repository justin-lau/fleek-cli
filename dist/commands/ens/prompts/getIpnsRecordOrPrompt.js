"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpnsRecordOrPrompt = void 0;
const cli_1 = require("../../../cli");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getIpnsRecordOrPrompt = async ({ name, sdk, siteId, }) => {
    if (name) {
        return await sdk.ipns().getRecord({ name });
    }
    const ipnsRecords = await sdk.ipns().listRecords();
    if (!ipnsRecords.length) {
        cli_1.output.spinner((0, translation_1.t)('ipnsNotLinkCreating'));
        const record = await sdk.ipns().createRecordForSite({ siteId });
        cli_1.output.stopSpinner();
        return record;
    }
    const selectedIpnsRecordId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('ipnsSelect')}:`,
        choices: ipnsRecords.map((record) => ({
            title: record.name,
            value: record.id,
        })),
    });
    const record = ipnsRecords.find((record) => record.id === selectedIpnsRecordId);
    if (!record)
        return;
    return record;
};
exports.getIpnsRecordOrPrompt = getIpnsRecordOrPrompt;
//# sourceMappingURL=getIpnsRecordOrPrompt.js.map