"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfiguration = void 0;
const errors_1 = require("@fleek-platform/errors");
const utils_validation_1 = require("@fleek-platform/utils-validation");
const readConfigurationFile_1 = require("./readConfigurationFile");
const loadConfiguration = async ({ predefinedConfigPath, }) => {
    const { configuration, configPath } = await (0, readConfigurationFile_1.readConfigurationFile)({
        predefinedConfigPath,
    });
    return (0, utils_validation_1.validateConfigurationWithResult)({ configuration }).catch((error) => Promise.reject(new errors_1.FleekConfigInvalidContentError({
        configPath,
        validationResult: error.message,
    })));
};
exports.loadConfiguration = loadConfiguration;
//# sourceMappingURL=loadConfiguration.js.map