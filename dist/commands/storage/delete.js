"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStorageActionHandler = exports.deleteStorageAction = void 0;
const errors_1 = require("@fleek-platform/errors");
const multiformats_1 = require("multiformats");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const processPromisesBatch_1 = require("../../utils/processPromisesBatch");
const translation_1 = require("../../utils/translation");
const deleteStorageAction = async ({ sdk, args }) => {
    const { cid, name } = args;
    const cidsToDelete = [];
    if (typeof name === 'string') {
        const splitFilename = name.split('.');
        const extension = (splitFilename.length > 1 && splitFilename.pop()) || '';
        const filename = splitFilename.join('.');
        const storage = await sdk.storage().getByFilename({ filename, extension });
        for (const s of storage) {
            cidsToDelete.push(s.cid);
        }
    }
    else if (cid) {
        try {
            multiformats_1.CID.parse(cid);
        }
        catch (err) {
            throw new errors_1.InvalidCidError({ name: cid });
        }
        cidsToDelete.push(cid);
    }
    try {
        await (0, processPromisesBatch_1.processPromisesBatch)(cidsToDelete, async (cid) => {
            const response = await sdk.storage().delete({ cid });
            cli_1.output.log(`${(0, translation_1.t)('processing')}${cid ? ` cid: ${cid}` : ''}${name ? ` name: ${name}` : ''}`);
            if (response.status === 200) {
                cli_1.output.success((0, translation_1.t)('commonItemActionSuccess', {
                    subject: cid ? `CID ${cid}` : `filename ${name}`,
                    action: (0, translation_1.t)('deleted'),
                }));
            }
            else if (response.status === 500) {
                // 500 status should be caught and should not affect other deletes in case of multiple deletes
                cli_1.output.error((0, translation_1.t)('commonItemActionFailure', {
                    action: (0, translation_1.t)('delete'),
                    subject: `${(0, translation_1.t)('storage')} "`,
                    message: `${response.body.message}`,
                }));
            }
            else {
                // eslint-disable-next-line fleek-custom/no-default-error
                throw new Error(response.body.message);
            }
            return;
        });
    }
    catch (error) {
        if (error instanceof Error) {
            cli_1.output.error(error.message);
        }
        else {
            console.error(error);
        }
    }
};
exports.deleteStorageAction = deleteStorageAction;
exports.deleteStorageActionHandler = (0, withGuards_1.withGuards)(exports.deleteStorageAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=delete.js.map