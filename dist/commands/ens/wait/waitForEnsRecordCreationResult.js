"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForEnsRecordCreationResult = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitForEnsRecordCreationResult = async ({ id, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const ens = await sdk.ens().get({ id });
            return ens.status === 'CREATED' || null;
        },
        period: 6000,
        tries: 10,
    });
};
exports.waitForEnsRecordCreationResult = waitForEnsRecordCreationResult;
//# sourceMappingURL=waitForEnsRecordCreationResult.js.map