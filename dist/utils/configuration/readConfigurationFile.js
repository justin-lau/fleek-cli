"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfigurationFile = void 0;
const node_module_1 = require("node:module");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const errors_1 = require("@fleek-platform/errors");
const ts_node_1 = require("ts-node");
const translation_1 = require("../../utils/translation");
const getConfiguration_1 = require("./getConfiguration");
const readConfigurationFile = async ({ predefinedConfigPath, }) => {
    const configPath = await (0, getConfiguration_1.getConfigurationPath)({ predefinedConfigPath });
    const fileExtension = (0, node_path_1.extname)(configPath);
    if (fileExtension === '.json') {
        const content = await node_fs_1.promises
            .readFile(configPath, 'utf8')
            .catch(() => Promise.reject(new errors_1.FleekConfigMissingFileError({})));
        try {
            return { configuration: JSON.parse(content), configPath };
        }
        catch (e) {
            throw new errors_1.FleekConfigInvalidContentError({
                configPath,
                validationResult: (0, translation_1.t)('jsonNotValid'),
            });
        }
    }
    if (fileExtension === '.ts') {
        (0, ts_node_1.register)({ skipProject: true });
    }
    if (['.js', '.ts'].includes(fileExtension)) {
        try {
            (0, node_module_1.createRequire)(configPath);
        }
        catch (e) {
            throw new errors_1.FleekConfigMissingFileError({ configPath });
        }
        try {
            // TODO: The `import` throws `UNKNOWN_FILE_EXTENSION`
            // Tried `ts-node/register` without success
            // Ideally `ts-node` should be removed
            // use `bun` or the new `deno` v2
            // Obs: For past months `bun` has been impeccable
            const loadedConfigModule = await (async () => {
                if (fileExtension.toLowerCase() === '.ts') {
                    const x = await import('importx');
                    const { default: loadedConfigModule } = await x.import(configPath, __filename);
                    return loadedConfigModule;
                }
                return import(configPath);
            })();
            if (typeof loadedConfigModule.default === 'function') {
                return {
                    configuration: await loadedConfigModule.default(),
                    configPath,
                };
            }
            if (typeof loadedConfigModule.default !== 'undefined') {
                return { configuration: await loadedConfigModule.default, configPath };
            }
            if (typeof loadedConfigModule === 'function') {
                return { configuration: await loadedConfigModule(), configPath };
            }
            if (typeof loadedConfigModule !== 'undefined') {
                return { configuration: await loadedConfigModule, configPath };
            }
        }
        catch (e) {
            throw new errors_1.FleekConfigInvalidContentError({
                configPath,
                validationResult: e instanceof Error ? e.message : '',
            });
        }
    }
    throw new errors_1.FleekConfigInvalidContentError({
        configPath,
        validationResult: (0, translation_1.t)('unknownFileExt'),
    });
};
exports.readConfigurationFile = readConfigurationFile;
//# sourceMappingURL=readConfigurationFile.js.map