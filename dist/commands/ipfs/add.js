"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActionHandler = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const utils_ipfs_1 = require("@fleek-platform/utils-ipfs");
const cli_1 = require("../../cli");
const withGuards_1 = require("../../guards/withGuards");
const translation_1 = require("../../utils/translation");
const getAllPrivateGatewayDomains_1 = require("../gateways/utils/getAllPrivateGatewayDomains");
const uploadPathOnIpfs_1 = require("./utils/uploadPathOnIpfs");
const addAction = async ({ sdk, args }) => {
    if (!node_fs_1.default.existsSync(args.path)) {
        cli_1.output.error((0, translation_1.t)('filePathNotFound', { path: args.path }));
        cli_1.output.printNewLine();
        return;
    }
    cli_1.output.spinner((0, translation_1.t)('uploadingFiles'));
    const root = await (0, uploadPathOnIpfs_1.uploadPathOnIpfs)({ sdk, path: args.path });
    if (!root) {
        cli_1.output.error((0, translation_1.t)('uploadFailureSomeReason'));
        cli_1.output.printNewLine();
        return;
    }
    const privateGatewayDomains = await (0, getAllPrivateGatewayDomains_1.getAllActivePrivateGatewayDomains)({
        sdk,
    });
    const hash = root.cid.toString();
    const successMsg = (0, translation_1.t)('uploadPathSuccessWithCID', { path: args.path, hash });
    cli_1.output.success(successMsg);
    cli_1.output.printNewLine();
    if (privateGatewayDomains.length === 0) {
        cli_1.output.hint(`${(0, translation_1.t)('getFileFromPubAddr')}:`);
        cli_1.output.link((0, utils_ipfs_1.getFleekXyzIpfsGatewayUrl)(hash));
        return;
    }
    cli_1.output.log(`${(0, translation_1.t)('visitViaPvtGw')}:`);
    for (const privateGatewayDomain of privateGatewayDomains) {
        cli_1.output.link((0, utils_ipfs_1.getPrivateIpfsGatewayUrl)({
            hostname: privateGatewayDomain.hostname,
            hash,
        }));
    }
};
exports.addActionHandler = (0, withGuards_1.withGuards)(addAction, {
    scopes: {
        authenticated: true,
        project: true,
        site: false,
    },
});
//# sourceMappingURL=add.js.map