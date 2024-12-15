"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilDomainDeleted = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitUntilDomainDeleted = async ({ domain, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => sdk
            .domains()
            .get({ domainId: domain.id })
            .then(() => false)
            .catch(() => true),
        period: 6000,
        tries: 10,
    });
};
exports.waitUntilDomainDeleted = waitUntilDomainDeleted;
//# sourceMappingURL=waitUntilDomainDeleted.js.map