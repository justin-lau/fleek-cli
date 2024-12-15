"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPathOnIpfs = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const uploadPathOnIpfs = async ({ sdk, path }) => {
    const stat = await node_fs_1.promises.stat(path);
    if (stat.isDirectory()) {
        const uploadResults = await sdk.ipfs().addFromPath(path, {
            wrapWithDirectory: true,
            // We must pass plain object instead of URLSearchParams because of ipfs-http-client bug
            searchParams: { alias: (0, node_path_1.basename)(path) },
        });
        return uploadResults.pop();
    }
    const content = await node_fs_1.promises.readFile(path);
    return sdk.ipfs().add({ path, content });
};
exports.uploadPathOnIpfs = uploadPathOnIpfs;
//# sourceMappingURL=uploadPathOnIpfs.js.map