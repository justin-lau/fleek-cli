"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationPath = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const errors_1 = require("@fleek-platform/errors");
const getConfigurationPath = async ({ predefinedConfigPath, }) => {
    if (predefinedConfigPath) {
        const absolutePath = (0, node_path_1.join)(process.cwd(), predefinedConfigPath);
        return node_fs_1.promises
            .access(absolutePath, node_fs_1.constants.R_OK)
            .then(() => absolutePath)
            .catch(() => Promise.reject(new errors_1.FleekConfigMissingFileError({ configPath: predefinedConfigPath })));
    }
    // Sorted by priority, we return only the first match
    const supposedFilenames = [
        'fleek.config.ts',
        'fleek.config.js',
        'fleek.config.json',
    ];
    for (const supposedFilename of supposedFilenames) {
        const absolutePath = (0, node_path_1.join)(process.cwd(), supposedFilename);
        const isSupposedFileAccessible = await node_fs_1.promises
            .access(absolutePath, node_fs_1.constants.R_OK)
            .then(() => true)
            .catch(() => false);
        if (isSupposedFileAccessible) {
            return absolutePath;
        }
    }
    throw new errors_1.FleekConfigMissingFileError({});
};
exports.getConfigurationPath = getConfigurationPath;
//# sourceMappingURL=getConfigurationPath.js.map