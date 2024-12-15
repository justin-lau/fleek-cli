"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnsActionHandler = exports.deleteEnsAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getEnsRecordOrPrompt_1 = require("./prompts/getEnsRecordOrPrompt");
const waitUntilEnsRecordDeleted_1 = require("./wait/waitUntilEnsRecordDeleted");
const deleteEnsAction = async ({ sdk, args }) => {
    const ensRecord = await (0, getEnsRecordOrPrompt_1.getEnsRecordOrPrompt)({
        id: args.id,
        name: args.name,
        sdk,
    });
    if (!ensRecord) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'ENS record' }));
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('ensDeleting'));
    await sdk.ens().delete({ id: ensRecord.id });
    const isDeleted = await (0, waitUntilEnsRecordDeleted_1.waitUntilEnsRecordDeleted)({ sdk, ensRecord });
    if (!isDeleted) {
        cli_1.output.error((0, translation_1.t)('ensCannotDelete', { ensRecordName: ensRecord.name }));
        return;
    }
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: `${(0, translation_1.t)('ens')} "${ensRecord.name}"`,
        action: (0, translation_1.t)('deleted'),
    }));
};
exports.deleteEnsAction = deleteEnsAction;
exports.deleteEnsActionHandler = (0, withGuards_1.withGuards)(exports.deleteEnsAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map