"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWhitelistDomains = void 0;
const parseWhitelistDomains = ({ whitelistDomains, whiteLabelDomains, }) => {
    const combinedWhitelistDomains = [
        ...whitelistDomains.map((whitelistDomain) => whitelistDomain.hostname),
        ...whiteLabelDomains.map((whiteLabelDomain) => whiteLabelDomain.hostname),
    ];
    const uniqueWhitelistDomains = Array.from(new Set(combinedWhitelistDomains)).map((uniqueWhitelistDomain) => ({
        hostname: uniqueWhitelistDomain,
    }));
    return uniqueWhitelistDomains;
};
exports.parseWhitelistDomains = parseWhitelistDomains;
//# sourceMappingURL=parser.js.map