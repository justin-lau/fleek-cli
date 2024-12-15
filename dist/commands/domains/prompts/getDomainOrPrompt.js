"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainOrPrompt = void 0;
const errors_1 = require("@fleek-platform/errors");
const selectPrompt_1 = require("../../../prompts/selectPrompt");
const translation_1 = require("../../../utils/translation");
const getDomainOrPrompt = async ({ id, hostname, sdk, choicesFilter, }) => {
    if (id) {
        return sdk.domains().get({ domainId: id });
    }
    if (hostname) {
        return sdk.domains().getByHostname({ hostname });
    }
    const allDomains = await sdk.domains().list();
    const domains = choicesFilter ? allDomains.filter(choicesFilter) : allDomains;
    if (!domains.length) {
        throw new errors_1.DomainsNotFoundError();
    }
    const selectedDomainId = await (0, selectPrompt_1.selectPrompt)({
        message: `${(0, translation_1.t)('selectDomain')}:`,
        choices: domains.map((domain) => ({
            title: domain.hostname,
            value: domain.id,
        })),
    });
    const domain = domains.find((domain) => domain.id === selectedDomainId);
    if (!domain)
        return;
    return domain;
};
exports.getDomainOrPrompt = getDomainOrPrompt;
//# sourceMappingURL=getDomainOrPrompt.js.map