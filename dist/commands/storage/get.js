"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageActionHandler = exports.getStorageAction = void 0;
const errors_1 = require("@fleek-platform/errors");
const multiformats_1 = require("multiformats");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const CreateOutputTable_1 = require("./utils/CreateOutputTable");
const getStorageAction = async ({ sdk, args, }) => {
    const { cid, name } = args;
    let storage;
    if (typeof name === 'string') {
        const splitFilename = name.split('.');
        const extension = (splitFilename.length > 1 && splitFilename.pop()) || '';
        const filename = splitFilename.join('.');
        storage = await sdk.storage().getByFilename({ filename, extension });
    }
    else if (cid) {
        try {
            multiformats_1.CID.parse(cid);
        }
        catch (err) {
            throw new errors_1.InvalidCidError({ name: cid });
        }
        try {
            storage = [await sdk.storage().get({ cid })];
        }
        catch (err) {
            storage = undefined;
        }
    }
    if (!storage || storage?.length === 0) {
        cli_1.output.warn((0, translation_1.t)('storageGetNotFound', {
            type: `${cid ? 'cid' : 'name'}`,
            value: cid || name || '',
        }));
        cli_1.output.log((0, translation_1.t)('storageAddSuggestion'));
        cli_1.output.log('fleek storage add <file_path>');
        return;
    }
    const table = await (0, CreateOutputTable_1.createOutputTable)({ sdk, storage });
    cli_1.output.table(table);
};
exports.getStorageAction = getStorageAction;
exports.getStorageActionHandler = (0, withGuards_1.withGuards)(exports.getStorageAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=get.js.map