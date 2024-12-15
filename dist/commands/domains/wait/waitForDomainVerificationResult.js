"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDomainVerificationResult = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitForDomainVerificationResult = async ({ domain, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const checkedDomain = await sdk.domains().get({ domainId: domain.id });
            return checkedDomain.status === 'ACTIVE' ||
                checkedDomain.status === 'VERIFYING_FAILED'
                ? checkedDomain.status
                : null;
        },
        period: 6000,
        tries: 10,
    });
};
exports.waitForDomainVerificationResult = waitForDomainVerificationResult;
//# sourceMappingURL=waitForDomainVerificationResult.js.map