"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGlobalNodeModuleInstall = exports.fileExists = void 0;
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
const isGlobalNodeModuleInstall = () => {
    const GLOBAL_EXEC_PATH_INCLUDES = 'node_modules/@fleek-platform/cli/bin/index.js';
    const executedScript = (0, node_fs_1.realpathSync)(process.argv[1]);
    return executedScript.includes(GLOBAL_EXEC_PATH_INCLUDES);
};
exports.isGlobalNodeModuleInstall = isGlobalNodeModuleInstall;
//# sourceMappingURL=fs.js.map