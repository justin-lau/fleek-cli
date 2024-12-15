"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteToAssignRecordOrPrompt = void 0;
const confirmPrompt_1 = require("../../../prompts/confirmPrompt");
const getSiteOrPrompt_1 = require("../../sites/prompts/getSiteOrPrompt");
const getSiteToAssignRecordOrPrompt = async ({ sdk, siteId, siteSlug, }) => {
    if (!siteId && !siteSlug) {
        const shouldSiteAssignToRecord = await (0, confirmPrompt_1.confirmPrompt)({
            message: 'Do you want to assign new IPNS record to the site?',
            initial: false,
        });
        if (!shouldSiteAssignToRecord) {
            return null;
        }
    }
    return (0, getSiteOrPrompt_1.getSiteOrPrompt)({ sdk, id: siteId, slug: siteSlug });
};
exports.getSiteToAssignRecordOrPrompt = getSiteToAssignRecordOrPrompt;
//# sourceMappingURL=getSiteToAssignRecordOrPrompt.js.map