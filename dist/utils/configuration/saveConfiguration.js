"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConfiguration = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const configuration_1 = require("../configuration");
const types_1 = require("./types");
const errors_1 = require("@fleek-platform/errors");
const formats_1 = require("../formats");
const DEV_SRC_UTILS_PATH = '/src/utils';
const basePath = node_path_1.default.dirname(__filename).includes(DEV_SRC_UTILS_PATH)
    ? '../..'
    : '';
const filePathForTypescriptConfig = node_path_1.default.resolve(node_path_1.default.dirname(__filename), basePath, 'templates/sites/config', (0, configuration_1.getConfigTemplateByTypeName)('Typescript'));
const filePathForJavascriptConfig = node_path_1.default.resolve(node_path_1.default.dirname(__filename), basePath, 'templates/sites/config', (0, configuration_1.getConfigTemplateByTypeName)('Javascript'));
const saveConfiguration = async ({ config, format, }) => {
    const formattedOutput = (() => {
        try {
            if (!Array.isArray(config.sites) || !config.sites[0].slug)
                throw Error();
            return JSON.stringify(config, undefined, 2);
        }
        catch (err) {
            throw new errors_1.InvalidJSONFormat();
        }
    })();
    if (!(0, formats_1.isValidFleekConfigFormat)(format)) {
        throw new errors_1.ExpectedOneOfValuesError({
            expectedValues: Object.values(types_1.FleekSiteConfigFormats),
            receivedValue: format,
        });
    }
    let content;
    let configFile;
    switch (format) {
        case types_1.FleekSiteConfigFormats.Typescript: {
            const contentForTypescriptConfig = (await node_fs_1.promises.readFile(filePathForTypescriptConfig)).toString();
            content = contentForTypescriptConfig.replace(configuration_1.FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER, formattedOutput);
            configFile = (0, configuration_1.getConfigFileByTypeName)('Typescript');
            break;
        }
        case types_1.FleekSiteConfigFormats.Javascript: {
            const contentForJavascriptConfig = (await node_fs_1.promises.readFile(filePathForJavascriptConfig)).toString();
            content = contentForJavascriptConfig.replace(configuration_1.FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER, formattedOutput);
            configFile = (0, configuration_1.getConfigFileByTypeName)('Javascript');
            break;
        }
        case types_1.FleekSiteConfigFormats.JSON: {
            content = formattedOutput;
            configFile = (0, configuration_1.getConfigFileByTypeName)('JSON');
            break;
        }
    }
    try {
        await node_fs_1.promises.writeFile(configFile, content);
        return configFile;
    }
    catch (_err) {
        // TODO: write to system log file, see PLAT-1097
    }
};
exports.saveConfiguration = saveConfiguration;
//# sourceMappingURL=saveConfiguration.js.map