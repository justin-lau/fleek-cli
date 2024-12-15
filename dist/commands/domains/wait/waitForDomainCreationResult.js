"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDomainCreationResult = void 0;
const checkPeriodicallyUntil_1 = require("../../../utils/checkPeriodicallyUntil");
const waitForDomainCreationResult = async ({ hostname, sdk, }) => {
    return (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
        conditionFn: async () => {
            const domain = await sdk.domains().getByHostname({ hostname });
            return domain.status === 'CREATED' || domain.status === 'CREATING_FAILED'
                ? domain.status
                : null;
        },
        period: 6000,
        tries: 10,
    });
};
exports.waitForDomainCreationResult = waitForDomainCreationResult;
//# sourceMappingURL=waitForDomainCreationResult.js.map