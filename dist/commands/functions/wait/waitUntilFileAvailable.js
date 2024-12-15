"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilFileAvailable = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitUntilFileAvailable = async ({ cid, }) => {
    const timeout = 10000;
    const gatewayPatterns = [
        'https://{cid}.ipfs.dweb.link',
        'https://{cid}.ipfs.w3s.link',
        'https://{cid}.ipfs.flk-ipfs.xyz',
        'https://ipfs.io/ipfs/{cid}',
        'https://fleek.ipfs.io/ipfs/{cid}',
    ];
    const createUrlPromises = () => gatewayPatterns.map((pattern) => {
        const url = pattern.replace(/\{(\w+)\}/g, cid);
        const fetchPromise = fetch(url).then((response) => {
            if (!response.ok) {
                // eslint-disable-next-line fleek-custom/no-default-error
                throw new Error(`Request failed for ${url}`);
            }
            return response;
        });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout fetching content from ${url}`)), timeout));
        return Promise.race([fetchPromise, timeoutPromise]);
    });
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const urlPromises = createUrlPromises();
            try {
                await Promise.any(urlPromises);
                return true;
            }
            catch {
                return false;
            }
        },
        period: 6000,
        tries: 50,
    });
};
exports.waitUntilFileAvailable = waitUntilFileAvailable;
//# sourceMappingURL=waitUntilFileAvailable.js.map