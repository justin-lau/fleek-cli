"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsRecordOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getEnsRecordOrPrompt = async ({ id, name, sdk, choicesFilter, }) => {
    if (id) {
        return await sdk.ens().get({ id });
    }
    if (name) {
        return await sdk.ens().getByName({ name });
    }
    const allEnsRecords = await sdk.ens().list();
    const ensRecords = choicesFilter
        ? allEnsRecords.filter(choicesFilter)
        : allEnsRecords;
    if (ensRecords.length === 0) {
        throw new errors_1.EnsRecordNotFoundError({ ensRecord: {} });
    }
    const selectedEnsRecordId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('commonSelectXFromList', { subject: (0, translation_1.t)('ensRecord') })}`,
        choices: ensRecords.map((ens) => ({ title: ens.name, value: ens.id })),
    });
    const record = ensRecords.find((ens) => ens.id === selectedEnsRecordId);
    return record;
};
exports.getEnsRecordOrPrompt = getEnsRecordOrPrompt;
//# sourceMappingURL=getEnsRecordOrPrompt.js.map