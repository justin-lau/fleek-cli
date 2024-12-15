"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseOrCreateSite = void 0;
const cli_1 = require("../../../cli");
const translation_1 = require("../../../utils/translation");
const confirmUseExistingSitePrompt_1 = require("../prompts/confirmUseExistingSitePrompt");
const getSiteOrPrompt_1 = require("../prompts/getSiteOrPrompt");
const createSite_1 = require("./createSite");
const chooseOrCreateSite = async ({ sdk, }) => {
    const sites = await sdk.sites().list();
    if (!sites.length) {
        cli_1.output.warn((0, translation_1.t)('noSitesFound'));
        return (0, createSite_1.createSite)({ sdk });
    }
    const useExistingSite = await (0, confirmUseExistingSitePrompt_1.confirmUseExistingSitePrompt)();
    if (useExistingSite) {
        const site = (0, getSiteOrPrompt_1.getSiteOrPrompt)({ sdk });
        if (!site) {
            cli_1.output.error((0, translation_1.t)('expectedNotFoundGeneric', { name: 'site' }));
            return;
        }
        return site;
    }
    return (0, createSite_1.createSite)({ sdk });
};
exports.chooseOrCreateSite = chooseOrCreateSite;
//# sourceMappingURL=chooseOrCreateSite.js.map