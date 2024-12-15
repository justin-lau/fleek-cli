"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = void 0;
const node_fs_1 = require("node:fs");
const fileExists = async (path) => {
    try {
        const stat = await node_fs_1.promises.stat(path);
        return stat.isFile();
    }
    catch (e) {
        const err = e;
        if (err.code === 'ENOENT') {
            return false;
        }
        throw e;
    }
};
exports.fileExists = fileExists;
//# sourceMappingURL=fileExists.js.map