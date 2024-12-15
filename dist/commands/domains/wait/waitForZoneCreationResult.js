"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForZoneCreationResult = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitForZoneCreationResult = async ({ zone, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const checkedZone = await sdk.domains().getZone({ id: zone.id });
            return checkedZone.status === 'CREATED' ||
                checkedZone.status === 'CREATING_FAILED'
                ? checkedZone.status
                : null;
        },
        period: 6000,
        tries: 10,
    });
};
exports.waitForZoneCreationResult = waitForZoneCreationResult;
//# sourceMappingURL=waitForZoneCreationResult.js.map