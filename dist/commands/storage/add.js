"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStorageActionHandler = exports.addStorageAction = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const utils_ipfs_1 = require("@fleek-platform/utils-ipfs");
const cli_progress_1 = __importDefault(require("cli-progress"));
const files_from_path_1 = require("files-from-path");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getAllPrivateGatewayDomains_1 = require("../gateways/utils/getAllPrivateGatewayDomains");
const upload_1 = require("./utils/upload");
const addStorageAction = async ({ sdk, args }) => {
    if (!(0, node_fs_1.existsSync)(args.path)) {
        cli_1.output.error((0, translation_1.t)('filePathNotFound', { path: args.path }));
        return;
    }
    const progressBar = new cli_progress_1.default.SingleBar({
        format: 'Upload Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    }, cli_progress_1.default.Presets.shades_grey);
    const directoryName = (0, node_path_1.basename)(args.path);
    const files = await (0, files_from_path_1.filesFromPaths)([args.path]);
    const storage = await (0, upload_1.uploadStorage)({
        path: args.path,
        sdk,
        files,
        directoryName,
        progressBar,
        onFailure: () => {
            progressBar.stop();
        },
    });
    if (!storage) {
        cli_1.output.error((0, translation_1.t)('somethingWrongDurUpload'));
        return;
    }
    const hash = storage?.pin.cid.toString();
    if (storage.duplicate) {
        cli_1.output.warn((0, translation_1.t)('fileAlreadyExistWarn', { path: args.path }));
        cli_1.output.printNewLine();
    }
    else {
        cli_1.output.success((0, translation_1.t)('storageUploadSuccessCid', { cid: hash }));
        cli_1.output.printNewLine();
    }
    const privateGatewayDomains = await (0, getAllPrivateGatewayDomains_1.getAllActivePrivateGatewayDomains)({
        sdk,
    });
    if (privateGatewayDomains.length === 0) {
        cli_1.output.log((0, translation_1.t)('visitViaGateway'));
        cli_1.output.link((0, utils_ipfs_1.getFleekXyzIpfsGatewayUrl)(hash));
        return;
    }
    cli_1.output.log((0, translation_1.t)('visitViaPvtGw'));
    for (const privateGatewayDomain of privateGatewayDomains) {
        cli_1.output.link((0, utils_ipfs_1.getPrivateIpfsGatewayUrl)({
            hostname: privateGatewayDomain.hostname,
            hash,
        }));
    }
    cli_1.output.printNewLine();
};
exports.addStorageAction = addStorageAction;
exports.addStorageActionHandler = (0, withGuards_1.withGuards)(exports.addStorageAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=add.js.map