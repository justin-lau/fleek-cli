"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForPersonalAccessTokenFromVerificationSession = void 0;
const checkPeriodicallyUntil_1 = require("../checkPeriodicallyUntil");
const waitForPersonalAccessTokenFromVerificationSession = async ({ verificationSessionId, client, name, }) => (0, checkPeriodicallyUntil_1.checkPeriodicallyUntil)({
    conditionFn: async () => {
        const response = await client
            .mutation({
            createPersonalAccessTokenFromVerificationSession: {
                __args: {
                    where: {
                        id: verificationSessionId,
                    },
                    data: {
                        name,
                    },
                },
            },
        })
            .catch(() => null);
        return response?.createPersonalAccessTokenFromVerificationSession ?? null;
    },
    period: 2000,
    tries: 500,
});
exports.waitForPersonalAccessTokenFromVerificationSession = waitForPersonalAccessTokenFromVerificationSession;
//# sourceMappingURL=waitForPersonalAccessTokenFromVerificationSession.js.map