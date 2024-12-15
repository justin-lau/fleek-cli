"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directoryExists = void 0;
const node_fs_1 = require("node:fs");
const directoryExists = async (path) => {
    try {
        const stat = await node_fs_1.promises.stat(path);
        return stat.isDirectory();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        const err = e;
        if (err.code === 'ENOENT') {
            return false;
        }
        throw e;
    }
};
exports.directoryExists = directoryExists;
//# sourceMappingURL=directoryExists.js.map