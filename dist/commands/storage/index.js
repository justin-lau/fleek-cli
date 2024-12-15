"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("../../cli");
const translation_1 = require("../../utils/translation");
const add_1 = require("./add");
const delete_1 = require("./delete");
const get_1 = require("./get");
const list_1 = require("./list");
exports.default = (program) => {
    const cmd = program
        .command('storage')
        .description((0, translation_1.t)('storageCmdDescription'));
    cmd
        .command('list')
        .description((0, translation_1.t)('storageListDescription'))
        .action(() => (0, list_1.listStorageActionHandler)());
    const getStorage = cmd
        .command('get')
        .description((0, translation_1.t)('storageDescription', { action: (0, translation_1.t)('get') }))
        .option('-c, --cid <cid>', (0, translation_1.t)('storageCidOption', { action: (0, translation_1.t)('get') }))
        .option('-n, --name <filenameWithExtension>', (0, translation_1.t)('storageNameOption', { action: (0, translation_1.t)('get') }));
    getStorage.action((options) => {
        if ((!options.name && !options.cid) || (options.name && options.cid)) {
            if (!getStorage.args.includes('help') &&
                !getStorage.optsWithGlobals().help) {
                cli_1.output.error((0, translation_1.t)('storageMissingOptCidOrName'));
            }
            cli_1.output.printNewLine();
            getStorage.outputHelp();
            return;
        }
        return (0, get_1.getStorageActionHandler)({ cid: options.cid, name: options.name });
    });
    const deleteStorage = cmd
        .command('delete')
        .description((0, translation_1.t)('storageDescription', { action: (0, translation_1.t)('delete') }))
        .option('-c, --cid <cid>', (0, translation_1.t)('storageCidOption', { action: (0, translation_1.t)('delete') }))
        .option('-n, --name <filenameWithExtension>', (0, translation_1.t)('storageNameOption', { action: (0, translation_1.t)('delete') }));
    deleteStorage.action((options) => {
        if ((!options.name && !options.cid) || (options.name && options.cid)) {
            if (!getStorage.args.includes('help') &&
                !getStorage.optsWithGlobals().help) {
                cli_1.output.error((0, translation_1.t)('storageMissingOptCidOrName'));
            }
            cli_1.output.printNewLine();
            deleteStorage.outputHelp();
            return;
        }
        return (0, delete_1.deleteStorageActionHandler)({ cid: options.cid, name: options.name });
    });
    cmd
        .command('add')
        .description((0, translation_1.t)('storageAddDescription'))
        .argument('<path>', (0, translation_1.t)('ipfsAddPathDescription'))
        .action((path) => (0, add_1.addStorageActionHandler)({ path }));
    return cmd;
};
//# sourceMappingURL=index.js.map