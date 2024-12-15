"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfiguration = void 0;
const saveConfiguration_1 = require("../../../utils/configuration/saveConfiguration");
const translation_1 = require("../../../utils/translation");
const enterDirectoryPathPrompt_1 = require("../prompts/enterDirectoryPathPrompt");
const selectConfigurationFormatPrompt_1 = require("../prompts/selectConfigurationFormatPrompt");
const chooseOrCreateSite_1 = require("./chooseOrCreateSite");
const selectBuildCommandOrSkip_1 = require("./selectBuildCommandOrSkip");
const initConfiguration = async ({ sdk }) => {
    const site = await (0, chooseOrCreateSite_1.chooseOrCreateSite)({ sdk });
    if (!site) {
        // TODO: Revise the initConfiguration
        console.error('Unexpected error');
        return;
    }
    const distDir = await (0, enterDirectoryPathPrompt_1.enterDirectoryPathPrompt)({
        message: (0, translation_1.t)('specifyDistDirToSiteUpl'),
    });
    const buildCommand = await (0, selectBuildCommandOrSkip_1.selectBuildCommandOrSkip)();
    const config = {
        sites: [{ slug: site.slug, distDir, buildCommand }],
    };
    const format = await (0, selectConfigurationFormatPrompt_1.selectConfigurationFormatPrompt)();
    await (0, saveConfiguration_1.saveConfiguration)({ config, format });
    return config;
};
exports.initConfiguration = initConfiguration;
//# sourceMappingURL=initCongifuration.js.map