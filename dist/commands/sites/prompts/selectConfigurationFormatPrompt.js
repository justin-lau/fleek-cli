"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectConfigurationFormatPrompt = void 0;
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const configuration_1 = require("../../../utils/configuration");
const translation_1 = require("../../../utils/translation");
const types_1 = require("../../../utils/configuration/types");
const choices = Object.keys(types_1.FleekSiteConfigFormats).map((name) => {
    const value = types_1.FleekSiteConfigFormats[name];
    const configFile = (0, configuration_1.getConfigFileByTypeValue)(value);
    return {
        title: `${name} (${configFile})`,
        value,
    };
});
const selectConfigurationFormatPrompt = async () => (0, selectPrompt_1.selectPrompt)({
    message: `${(0, translation_1.t)('selectFormatForSiteConf')}:`,
    choices,
});
exports.selectConfigurationFormatPrompt = selectConfigurationFormatPrompt;
//# sourceMappingURL=selectConfigurationFormatPrompt.js.map