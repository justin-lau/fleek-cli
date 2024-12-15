"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilEnsRecordDeleted = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitUntilEnsRecordDeleted = async ({ ensRecord, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => sdk
            .ens()
            .get({ id: ensRecord.id })
            .then(() => false)
            .catch(() => true),
        period: 6000,
        tries: 10,
    });
};
exports.waitUntilEnsRecordDeleted = waitUntilEnsRecordDeleted;
//# sourceMappingURL=waitUntilEnsRecordDeleted.js.map