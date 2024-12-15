"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActionHandler = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const confirmDeleteRecordPrompt_1 = require("./prompts/confirmDeleteRecordPrompt");
const getRecordOrPrompt_1 = require("./prompts/getRecordOrPrompt");
const deleteAction = async ({ sdk, args, }) => {
    const foundRecord = await (0, getRecordOrPrompt_1.getRecordOrPrompt)({ sdk, name: args.name });
    if (!foundRecord) {
        cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'record' }));
        return;
    }
    const shouldDeleteRecord = await (0, confirmDeleteRecordPrompt_1.confirmDeleteRecordPrompt)();
    if (!shouldDeleteRecord) {
        return;
    }
    await sdk.ipns().deleteRecord({ id: foundRecord.id });
    cli_1.output.printNewLine();
    cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
        subject: (0, translation_1.t)('ipnsRecord'),
        action: (0, translation_1.t)('deleted'),
    }));
};
exports.deleteActionHandler = (0, withGuards_1.withGuards)(deleteAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map