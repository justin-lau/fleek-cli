"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForEnsRecordVerificationResult = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitForEnsRecordVerificationResult = async ({ id, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const checkedEns = await sdk.ens().get({ id });
            return checkedEns.status === 'ACTIVE' ||
                checkedEns.status === 'VERIFYING_FAILED'
                ? checkedEns.status
                : null;
        },
        period: 6000,
        tries: 10,
    });
};
exports.waitForEnsRecordVerificationResult = waitForEnsRecordVerificationResult;
//# sourceMappingURL=waitForEnsRecordVerificationResult.js.map