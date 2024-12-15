"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStorageActionHandler = exports.listStorageAction = void 0;
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const CreateOutputTable_1 = require("./utils/CreateOutputTable");
const listStorageAction = async ({ sdk }) => {
    const storage = await sdk.storage().list();
    if (!storage?.length) {
        cli_1.output.warn((0, translation_1.t)('storageListNotFound'));
        cli_1.output.log((0, translation_1.t)('storageAddSuggestion'));
        cli_1.output.log('fleek storage add <file_path>');
        return;
    }
    const table = await (0, CreateOutputTable_1.createOutputTable)({ sdk, storage });
    cli_1.output.table(table);
};
exports.listStorageAction = listStorageAction;
exports.listStorageActionHandler = (0, withGuards_1.withGuards)(exports.listStorageAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=list.js.map