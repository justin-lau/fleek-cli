"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilZoneDeleted = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitUntilZoneDeleted = async ({ zone, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => sdk
            .domains()
            .getZone({ id: zone.id })
            .then(() => false)
            .catch(() => true),
        period: 6000,
        tries: 10,
    });
};
exports.waitUntilZoneDeleted = waitUntilZoneDeleted;
//# sourceMappingURL=waitUntilZoneDeleted.js.map