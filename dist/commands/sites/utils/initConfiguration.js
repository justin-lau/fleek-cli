"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfiguration = void 0;
const saveConfiguration_1 = require("../../../utils/configuration/saveConfiguration");
const formats_1 = require("../../../utils/formats");
const fs_1 = require("../../../utils/fs");
const translation_1 = require("../../../utils/translation");
const enterDirectoryPathPrompt_1 = require("../prompts/enterDirectoryPathPrompt");
const selectConfigurationFormatPrompt_1 = require("../prompts/selectConfigurationFormatPrompt");
const selectBuildCommandOrSkip_1 = require("./selectBuildCommandOrSkip");
const initConfiguration = async ({ site, onUnexpectedFormatError, onSaveConfigurationError, }) => {
    const distDir = await (0, enterDirectoryPathPrompt_1.enterDirectoryPathPrompt)({
        message: (0, translation_1.t)('specifyDistDirToSiteUpl'),
    });
    const buildCommand = await (0, selectBuildCommandOrSkip_1.selectBuildCommandOrSkip)();
    const config = {
        sites: [{ slug: site.slug, distDir, buildCommand }],
    };
    const format = await (0, selectConfigurationFormatPrompt_1.selectConfigurationFormatPrompt)();
    if (!(0, formats_1.isValidFleekConfigFormat)(format)) {
        onUnexpectedFormatError(format);
    }
    const configFile = await (0, saveConfiguration_1.saveConfiguration)({ config, format });
    if (!configFile) {
        onSaveConfigurationError();
        return;
    }
    const isFile = await (0, fs_1.fileExists)(configFile);
    if (!isFile) {
        onSaveConfigurationError();
        return;
    }
    return config;
};
exports.initConfiguration = initConfiguration;
//# sourceMappingURL=initConfiguration.js.map