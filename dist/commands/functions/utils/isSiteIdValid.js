"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSiteIdValid = void 0;
const isSiteIdValid = async ({ siteId, sdk, }) => {
    try {
        await sdk.sites().get({ id: siteId });
        return true;
    }
    catch {
        return false;
    }
};
exports.isSiteIdValid = isSiteIdValid;
//# sourceMappingURL=isSiteIdValid.js.map