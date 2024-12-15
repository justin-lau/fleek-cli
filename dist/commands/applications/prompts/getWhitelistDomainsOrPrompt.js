"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhitelistDomainsOrPrompt = void 0;
const cli_1 = require("../../../cli");
const listPrompt_1 = require("../../../prompts/listPrompt");
const translation_1 = require("../../../utils/translation");
const getWhitelistDomainsOrPrompt = async ({ whitelistDomains, whitelistDomainsToUpdate, }) => {
    if (whitelistDomains) {
        return whitelistDomains;
    }
    const list = await (0, listPrompt_1.listPrompt)({
        message: (0, translation_1.t)('typeWhitelistDomainsSepByComma'),
        initial: whitelistDomainsToUpdate,
    });
    const domains = list.filter((hostname) => hostname.length > 0);
    if (!domains.length) {
        cli_1.output.warn((0, translation_1.t)('warnProvideValidDomainName'));
        cli_1.output.printNewLine();
        return (0, exports.getWhitelistDomainsOrPrompt)({
            whitelistDomains,
            whitelistDomainsToUpdate,
        });
    }
    return domains;
};
exports.getWhitelistDomainsOrPrompt = getWhitelistDomainsOrPrompt;
//# sourceMappingURL=getWhitelistDomainsOrPrompt.js.map