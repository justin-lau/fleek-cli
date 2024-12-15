"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getSiteOrPrompt = async ({ id, slug, sdk, }) => {
    if (id) {
        return sdk.sites().get({ id });
    }
    if (slug) {
        return sdk.sites().getBySlug({ slug });
    }
    const sites = await sdk.sites().list();
    if (!sites.length) {
        throw new errors_1.SitesNotFoundError();
    }
    const selectedSiteId = await (0, selectPrompt_1.selectPrompt)({
        message: (0, translation_1.t)('commonSelectXFromList', { subject: (0, translation_1.t)('site') }),
        choices: sites.map((site) => ({ title: site.name, value: site.id })),
    });
    const matchSite = sites.find((site) => site.id === selectedSiteId);
    if (!matchSite)
        return;
    return matchSite;
};
exports.getSiteOrPrompt = getSiteOrPrompt;
//# sourceMappingURL=getSiteOrPrompt.js.map