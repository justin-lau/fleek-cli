"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailEnsRecordsActionHandler = exports.detailEnsRecordsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getEnsRecordOrPrompt_1 = require("./prompts/getEnsRecordOrPrompt");
const detailEnsRecordsAction = async ({ sdk, args }) => {
    const ensRecord = await (0, getEnsRecordOrPrompt_1.getEnsRecordOrPrompt)({
        id: args.id,
        name: args.name,
        sdk,
    });
    if (!ensRecord) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'ENS Record' }));
        return;
    }
    cli_1.output.table([
        {
            ENS: ensRecord.name,
            Status: ensRecord.status,
            'Created At': ensRecord.createdAt,
        },
    ]);
    cli_1.output.log(`${(0, translation_1.t)('ensConfigAsTable')}:`);
    cli_1.output.table([
        {
            Name: 'Content Hash',
            Value: `ipns://${ensRecord.ipnsRecord.name}`,
        },
    ]);
};
exports.detailEnsRecordsAction = detailEnsRecordsAction;
exports.detailEnsRecordsActionHandler = (0, withGuards_1.withGuards)(exports.detailEnsRecordsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=detail.js.map